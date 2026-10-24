/**
 * 2028학년도 대입 학업역량 강화 및 생성형 AI 입시 상담 웹 애플리케이션 코어 스크립트
 * 경기도 일반고 5등급제 맞춤형 진단 & 수도권 상위 25개교 공식 2028 시행계획 연동
 */

// 전역 상태
const STATE = {
  currentTab: 'chat',
  userProfile: {
    gpa: 1.65, // 5등급제 전과목 평균 내신
    gpaKor: 1.5,
    gpaMath: 1.5,
    gpaEng: 1.5,
    gpaSoc: 1.8,
    gpaSci: 1.6,
    careerAchieveA_Ratio: 0.8, // 진로선택 A비율 (0~1)
    unexcusedAbsence: 0,       // 미인정 결석
    unexcusedTardiness: 0,     // 미인정 지각
    unexcusedEarlyLeave: 0,    // 미인정 조퇴
    unexcusedResult: 0,        // 미인정 결과
    csatKor: 2,
    csatMath: 2,
    csatEng: 2,
    csatHist: 2,
    csatSoc: 3,
    csatSci: 2,
    targetTrack: 'eng',        // 희망 계열
    selectedCourses: ['공통국어1·2', '공통수학1·2', '공통영어1·2', '통합사회1·2', '통합과학1·2', '한국사1·2', '대수', '미적분Ⅰ', '물리학', '화학', '정보', '미적분Ⅱ']
  },
  compareList: ['snu', 'korea', 'yonsei'],
  chatHistory: [],
  isTyping: false
};

// 탭 전환
function switchTab(tabId) {
  STATE.currentTab = tabId;
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `pane-${tabId}`);
  });

  if (tabId === 'compare') {
    renderCompareView();
    renderUnivEncyclopedia();
  } else if (tabId === 'calc') {
    runSimulator();
  } else if (tabId === 'curriculum') {
    renderCurriculumTrack();
  } else if (tabId === 'archive') {
    renderCompassArchive();
  }
}

// ─────────────────────────────────────────────────────────────
// [모듈 1] 🤖 2028 생성형 AI 입시 상담관 (Gemini/ChatGPT 스타일 RAG 엔진)
// ─────────────────────────────────────────────────────────────

const AI_KNOWLEDGE = {
  getSystemContext() {
    const prof = STATE.userProfile;
    const totalLate = prof.unexcusedTardiness + prof.unexcusedEarlyLeave + prof.unexcusedResult;
    return `[학생 프로필: 2026년 고2/경기도 일반고 학생 (2028 대입 5등급제 첫 세대)]
- 현재 내신: 5등급제 평균 ${prof.gpa.toFixed(2)}등급 (국:${prof.gpaKor}, 수:${prof.gpaMath}, 영:${prof.gpaEng}, 사:${prof.gpaSoc}, 과:${prof.gpaSci})
- 출결 현황: 미인정 결석 ${prof.unexcusedAbsence}일, 미인정 지각/조퇴/결과 합계 ${totalLate}회 (지각:${prof.unexcusedTardiness}, 조퇴:${prof.unexcusedEarlyLeave}, 결과:${prof.unexcusedResult})
- 모의고사 수능 추정: 국${prof.csatKor}, 수${prof.csatMath}, 영${prof.csatEng}, 한${prof.csatHist}, 사${prof.csatSoc}, 과${prof.csatSci}
- 희망 계열: ${getTrackName(prof.targetTrack)}`;
  }
};

function getTrackName(trackId) {
  const map = {
    'med': '의·약·치·한·수의학 계열',
    'eng': '공학·반도체·AI·컴퓨터 계열',
    'nat': '자연과학·생명·화학 계열',
    'biz': '경영·경제·금융·상경 계열',
    'hum': '인문·어문·교육 계열',
    'soc': '사회과학·법·행정·미디어 계열'
  };
  return map[trackId] || '일반 계열';
}

// 질문 전송
function handleSendChat(userText = null) {
  if (STATE.isTyping) return;
  const inputEl = document.getElementById('chat-input');
  const query = (userText || inputEl.value).trim();
  if (!query) return;

  if (!userText) inputEl.value = '';

  appendChatMessage('user', query);

  // 로딩 인디케이터
  const loadingId = 'ai-loading-' + Date.now();
  appendLoadingIndicator(loadingId);

  STATE.isTyping = true;

  setTimeout(() => {
    removeLoadingIndicator(loadingId);
    const responseHtml = generateAiResponse(query);
    appendChatMessage('ai', responseHtml, true);
    STATE.isTyping = false;
  }, 450);
}

function appendChatMessage(role, content, isHtml = false) {
  const box = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${role}`;

  const avatar = role === 'user' ? '🧑‍🎓' : '🤖';
  const roleName = role === 'user' ? '나 (경기도 일반고 2학년)' : '2028 대입 전문 수석 입학상담관 AI';

  msgDiv.innerHTML = `
    <div class="msg-header">
      <span class="avatar">${avatar}</span>
      <span class="role-name">${roleName}</span>
      <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    </div>
    <div class="msg-bubble">
      ${isHtml ? content : escapeHtml(content)}
    </div>
  `;
  box.appendChild(msgDiv);
  box.scrollTop = box.scrollHeight;
}

function appendLoadingIndicator(id) {
  const box = document.getElementById('chat-messages');
  const loadDiv = document.createElement('div');
  loadDiv.id = id;
  loadDiv.className = 'chat-msg ai loading';
  loadDiv.innerHTML = `
    <div class="msg-header">
      <span class="avatar">🤖</span>
      <span class="role-name">2028 입학전형 시행계획 공식 DB 탐색 중...</span>
    </div>
    <div class="msg-bubble">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
      <p style="font-size:12px; color:#5b7095; margin-top:6px;">상위 25개 대학 2028 시행계획 PDF 및 경기진학지도협의회 나침반 데이터베이스 실시간 연동 중...</p>
    </div>
  `;
  box.appendChild(loadDiv);
  box.scrollTop = box.scrollHeight;
}

function removeLoadingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]));
}

// 지능형 RAG 응답 생성기
function generateAiResponse(query) {
  const q = query.toLowerCase();
  const prof = STATE.userProfile;
  const totalLate = prof.unexcusedTardiness + prof.unexcusedEarlyLeave + prof.unexcusedResult;

  // 1. 단일 대학 질의 (예: "고려대 2028 교과 알려줘", "연세대 논술 최저")
  const matchedUniv = UNIV_25.find(u => q.includes(u.name) || q.includes(u.name.replace('대학교','')) || q.includes(u.id));

  // 2. 다중 대학 비교 질의 ("연세대 고려대 비교", "서강대 성대 한양대")
  const matchedUnivs = UNIV_25.filter(u => q.includes(u.name) || q.includes(u.name.replace('대학교','')));

  if (matchedUnivs.length >= 2) {
    return generateMultiUnivComparisonResponse(matchedUnivs);
  }

  if (matchedUniv) {
    return generateSingleUnivResponse(matchedUniv, q);
  }

  // 3. 출결/지각 관련 질의 ("미인정 지각 4번", "출결 감점", "결석")
  if (q.includes('지각') || q.includes('출결') || q.includes('결석') || q.includes('미인정')) {
    return generateAttendanceAnalysisResponse(q);
  }

  // 4. 수능 최저 관련 질의 ("수능최저 없는", "수능 최저 없는 대학", "최저 없는 교과")
  if (q.includes('수능최저') || q.includes('수능 최저') || q.includes('최저 없는') || q.includes('최저없는')) {
    return generateSuneungMinSummaryResponse(q);
  }

  // 5. 2022 개정 권장과목 질의 ("컴공 과목", "컴퓨터공학 권장과목", "의대 과목", "선택과목")
  if (q.includes('권장과목') || q.includes('필수과목') || q.includes('선택과목') || q.includes('과목') || q.includes('컴공') || q.includes('의대') || q.includes('반도체')) {
    return generateCourseRecommendationResponse(q);
  }

  // 6. 성적 기준 추천 질의 ("내신 1.6", "2등급", "지원 가능한 대학", "갈 수 있는 대학")
  if (q.includes('등급') || q.includes('내신') || q.includes('갈 수 있는') || q.includes('지원 가능') || q.includes('추천')) {
    return generateGpaRecommendationResponse(q);
  }

  // 기본 포괄 상담 응답
  return generateGeneralCounselingResponse(q);
}

// 단일 대학 상세 응답
function generateSingleUnivResponse(u, q) {
  const prof = STATE.userProfile;
  return `
    <div class="ai-res-box">
      <div class="ai-res-header">
        <span class="badge badge-primary">${u.region}</span>
        <span class="badge badge-outline">${u.type}</span>
        <span class="badge badge-accent">${u.tier}위권</span>
        <h4 style="margin:4px 0 0 0; font-size:18px; color:#0f2b5c;">${u.name} 2028학년도 대학입학전형 정밀 분석</h4>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">📢 2028학년도 핵심 주요 변경사항 (공식 시행계획 확정)</div>
        <ul class="styled-list">
          ${u.changes2028.map(c => `<li><strong>${c}</strong></li>`).join('')}
        </ul>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">📋 2028 수시 학생부교과 전형 핵심 데이터</div>
        <table class="ai-table">
          <tr><th>전형명 / 모집인원</th><td><strong>${u.gyogwa.name}</strong> (${u.gyogwa.quota})</td></tr>
          <tr><th>전형 방법</th><td>${u.gyogwa.method}</td></tr>
          <tr><th>고교별 추천 인원</th><td><span class="tag-rec">${u.gyogwa.recLimit}</span></td></tr>
          <tr><th>반영 교과 및 산출</th><td>${u.gyogwa.reflectedSubjects} (${u.gyogwa.careerSubjectMethod})</td></tr>
          <tr><th>5등급제 배점 구조</th><td><code>${u.gyogwa.gradeTable5}</code></td></tr>
          <tr><th>미인정 출결 감점 기준</th><td><span class="tag-warn">${u.gyogwa.attendanceRule}</span></td></tr>
          <tr><th>2028 수능 최저학력기준</th><td><span class="tag-suneung">${u.gyogwa.suneungMin}</span></td></tr>
          <tr><th>경기도 일반고 합격선</th><td>
            안정: <strong style="color:#0f7a3c;">${u.gyogwa.safeGrade5}등급</strong> | 
            적정: <strong style="color:#1a4db8;">${u.gyogwa.fitGrade5}등급</strong> | 
            소신: <strong style="color:#d97706;">${u.gyogwa.reachGrade5}등급</strong>
          </td></tr>
        </table>
        <div class="tip-box">
          💡 <strong>전형 전문가 분석노트:</strong> ${u.gyogwa.note}
        </div>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🏛️ 학생부종합 및 논술·정시 전형 요약</div>
        <ul class="styled-list">
          ${u.jonghap.map(j => `<li><strong>[학종] ${j.name}:</strong> ${j.method} (수능최저: ${j.suneungMin}) — <em>${j.feature}</em></li>`).join('')}
          <li><strong>[논술] ${u.nonsul.name}:</strong> ${u.nonsul.method} (수능최저: ${u.nonsul.suneungMin})</li>
          <li><strong>[정시] ${u.jeongsi.name}:</strong> ${u.jeongsi.method} (학생부 반영: <strong>${u.jeongsi.studentRecordReflection}</strong>)</li>
        </ul>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">📚 2022 개정 권장과목 & 세특 가이드</div>
        <p style="font-size:13px; line-height:1.6; margin-bottom:6px;">
          • <strong>자연/공학:</strong> ${u.recSubjects.natural} / ${u.recSubjects.engineering}<br>
          • <strong>의약학:</strong> ${u.recSubjects.medical}<br>
          • <strong>인문/상경:</strong> ${u.recSubjects.humanities} / ${u.recSubjects.business}<br>
          • <strong>평가 주안점:</strong> ${u.recSubjects.note}
        </p>
      </div>

      <div class="ai-res-footer">
        <div class="btn-group">
          <a class="btn btn-pdf" href="${u.pdf2028Url}" target="_blank" rel="noopener">📄 ${u.name} 2028 시행계획 PDF 열기</a>
          <a class="btn btn-home" href="${u.homeUrl}" target="_blank" rel="noopener">🏫 ${u.name} 입학처 바로가기</a>
          ${u.recruit2027Url ? `<a class="btn btn-recruit" href="${u.recruit2027Url}" target="_blank" rel="noopener">📋 2027 수시요강</a>` : ''}
          <button class="btn btn-outline" onclick="addUniversityToCompare('${u.id}')">⚖️ 비교함에 담기</button>
        </div>
      </div>
    </div>
  `;
}

// 다중 대학 비교 응답
function generateMultiUnivComparisonResponse(univList) {
  return `
    <div class="ai-res-box">
      <div class="ai-res-header">
        <span class="badge badge-accent">비교 분석</span>
        <h4 style="margin:4px 0 0 0; font-size:18px; color:#0f2b5c;">
          ${univList.map(u => u.name).join(' vs ')} 2028학년도 입학전형 한눈에 비교
        </h4>
      </div>

      <div style="overflow-x:auto; margin:14px 0;">
        <table class="ai-compare-table">
          <thead>
            <tr>
              <th>구분</th>
              ${univList.map(u => `<th>${u.name}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>교과 전형명</strong></td>
              ${univList.map(u => `<td><strong>${u.gyogwa.name}</strong></td>`).join('')}
            </tr>
            <tr>
              <td><strong>전형 방법</strong></td>
              ${univList.map(u => `<td>${u.gyogwa.method}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>수능 최저</strong></td>
              ${univList.map(u => `<td><span class="tag-suneung">${u.gyogwa.suneungMin}</span></td>`).join('')}
            </tr>
            <tr>
              <td><strong>5등급제 배점</strong></td>
              ${univList.map(u => `<td><small>${u.gyogwa.gradeTable5}</small></td>`).join('')}
            </tr>
            <tr>
              <td><strong>미인정 출결 감점</strong></td>
              ${univList.map(u => `<td><span class="tag-warn">${u.gyogwa.attendanceRule}</span></td>`).join('')}
            </tr>
            <tr>
              <td><strong>일반고 합격선</strong></td>
              ${univList.map(u => `<td>안정: ${u.gyogwa.safeGrade5}<br>적정: ${u.gyogwa.fitGrade5}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>정시 학생부 반영</strong></td>
              ${univList.map(u => `<td><strong>${u.jeongsi.studentRecordReflection}</strong></td>`).join('')}
            </tr>
            <tr>
              <td><strong>공식 PDF</strong></td>
              ${univList.map(u => `<td><a class="btn-mini btn-pdf" href="${u.pdf2028Url}" target="_blank">PDF 원문</a></td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-box">
        💡 <strong>상담관 핵심 요약:</strong> 수능 최저학력기준이 없는 대학(예: 서울대 지균, 고려대 학추 일반, 동국대 학추)은 5등급제 1.0~1.1등급대 극상위권의 각축전이 예상되며, 서류평가(세특) 비중이 당락을 좌우합니다. 반면 수능최저가 유지/강화된 대학(연세대, 서강대, 성균관대 등)은 1.3~1.6등급대에서도 최저 충족으로 대역전이 가능합니다.
      </div>
    </div>
  `;
}

// 출결 감점 질의 응답
function generateAttendanceAnalysisResponse(q) {
  const prof = STATE.userProfile;
  const late = prof.unexcusedTardiness;
  const abs = prof.unexcusedAbsence;
  const totalLate = prof.unexcusedTardiness + prof.unexcusedEarlyLeave + prof.unexcusedResult;

  return `
    <div class="ai-res-box">
      <div class="ai-res-header">
        <span class="badge badge-warn">출결 감점 정밀 분석</span>
        <h4 style="margin:4px 0 0 0; font-size:18px; color:#0f2b5c;">
          2028학년도 상위 25개 대학 미인정 지각·결석 감점 기준 총정리
        </h4>
        <p style="font-size:13px; color:#556688; margin-top:4px;">
          현재 입력된 학생 상태: <strong>미인정 결석 ${abs}일, 미인정 지각·조퇴·결과 ${totalLate}회</strong>
        </p>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">⚠️ 주요 대학별 출결 환산 및 감점 규정</div>
        <table class="ai-table">
          <thead>
            <tr>
              <th>대학명</th>
              <th>출결 반영 전형</th>
              <th>지각 환산 공식</th>
              <th>무감점(만점) 기준</th>
              <th>감점 페널티</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>경희대</strong></td>
              <td>학생부교과(지균 7%)</td>
              <td><span class="tag-warn">지각 2회 = 결석 1일</span></td>
              <td>미인정 결석 2일 이하</td>
              <td>3일 이상부터 교과 비교과에서 직접 감점</td>
            </tr>
            <tr>
              <td><strong>서강대</strong></td>
              <td>교과(10%), 논술(10%), 정시(10%)</td>
              <td>지각 3회 = 결석 1일 (버림)</td>
              <td>미인정 결석 0~3일 만점(100점)</td>
              <td>4~6일 98점(-2점), 7~9일 96점(-4점), 15일 이상 0점</td>
            </tr>
            <tr>
              <td><strong>이화여대</strong></td>
              <td>학생부교과(고교추천 5%)</td>
              <td>지각 3회 = 결석 1일</td>
              <td>미인정 결석 1일 이하 (50점)</td>
              <td>2~3일 40점(-10점 대폭 감점!), 4~5일 30점</td>
            </tr>
            <tr>
              <td><strong>동국대</strong></td>
              <td>논술(10%), 실기(10%)</td>
              <td>지각 1회 = 결석 0.5일</td>
              <td>결석 환산 3회 이하 (10점 만점)</td>
              <td>지각 6회까지 무감점! 3.5~6회 9점</td>
            </tr>
            <tr>
              <td><strong>아주대</strong></td>
              <td>학생부교과(고교추천 10%)</td>
              <td>지각 3회 = 결석 1일</td>
              <td>미인정 결석 0~3일 (10점 만점)</td>
              <td>4~9일 8점(-2점), 10~14일 6점</td>
            </tr>
            <tr>
              <td><strong>숙명여대</strong></td>
              <td>정시 일반학생 전 전형</td>
              <td>지각 미반영 (결석만 산정)</td>
              <td>미인정 결석 3일 이하 (0점)</td>
              <td>4~5일 -1점, 6~7일 -3점, 8일 이상 -5점 감점</td>
            </tr>
            <tr>
              <td><strong>중앙대</strong></td>
              <td>교과(10%), 논술(10%), 수능89(11%)</td>
              <td>미인정 결석·조퇴만 반영</td>
              <td>결석/조퇴 일수별 차등 환산</td>
              <td>환산점수표에 따라 감산</td>
            </tr>
            <tr>
              <td><strong>서울대/연세대/고려대/성균관대/한양대</strong></td>
              <td>수시 교과/학종 서류평가</td>
              <td>정성평가 종합 반영</td>
              <td>-</td>
              <td>학생부종합/서류평가에서 '성실성/인성' 점수 감점 요인</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-box">
        💡 <strong>상담관 출결 코칭:</strong><br>
        1. <strong>이화여대</strong>는 결석 2일(지각 6회) 이상부터 10점(전형 총점의 1%)이 깎여 가장 치명적입니다.<br>
        2. <strong>경희대</strong>는 다른 대학과 달리 <em>지각 2회당 결석 1일</em>로 계산되므로, 지각 4번이면 결석 2일로 인정됩니다.<br>
        3. <strong>서강대, 아주대, 동국대</strong>는 미인정 결석 3일(지각 9번)까지는 감점이 없어 상대적으로 안전합니다.
      </div>
    </div>
  `;
}

// 수능 최저 요약 질의 응답
function generateSuneungMinSummaryResponse(q) {
  const withoutMinGyogwa = UNIV_25.filter(u => u.gyogwa.suneungMin.includes('없음') || u.gyogwa.suneungMin.includes('폐지'));
  const withMinGyogwa = UNIV_25.filter(u => !u.gyogwa.suneungMin.includes('없음') && !u.gyogwa.suneungMin.includes('폐지'));

  return `
    <div class="ai-res-box">
      <div class="ai-res-header">
        <span class="badge badge-accent">수능 최저학력기준 분석</span>
        <h4 style="margin:4px 0 0 0; font-size:18px; color:#0f2b5c;">
          2028학년도 수도권 상위 25개교 수능 최저 유무 완벽 정리
        </h4>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🎉 [수시 학생부교과] 수능 최저학력기준 "없는" 대학 (내신/세특 승부처)</div>
        <div class="card-grid-mini">
          ${withoutMinGyogwa.map(u => `
            <div class="mini-card">
              <strong style="color:#0f2b5c;">${u.name}</strong><br>
              <small>${u.gyogwa.name}</small><br>
              <span class="tag-free">최저 없음!</span>
              <p style="font-size:11.5px; color:#667799; margin-top:4px;">${u.gyogwa.method}</p>
            </div>
          `).join('')}
        </div>
        <p style="font-size:12.5px; color:#d97706; margin-top:6px;">
          * 특히 <strong>서울대 지균</strong>(최저 전면 폐지), <strong>고려대 학추</strong>(인문/자연 폐지, 의예과만 4합5), <strong>동국대 학추</strong>(최저 없음), <strong>숙명여대 지균</strong>(약학 제외 폐지), <strong>경기대 학추</strong>(최저 없음)는 수능 부담 없이 지원 가능!
        </p>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🎯 [수시 학생부교과] 수능 최저학력기준 "있는" 주요 대학</div>
        <table class="ai-table">
          <thead>
            <tr><th>대학명</th><th>전형명</th><th>2028 수능 최저학력기준</th><th>안정권 등급</th></tr>
          </thead>
          <tbody>
            ${withMinGyogwa.slice(0, 8).map(u => `
              <tr>
                <td><strong>${u.name}</strong></td>
                <td>${u.gyogwa.name}</td>
                <td><span class="tag-suneung">${u.gyogwa.suneungMin}</span></td>
                <td>${u.gyogwa.safeGrade5}등급</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="tip-box">
        💡 <strong>상담관 전략 팁:</strong> 모의고사 수능 성적이 불안정한 학생은 수능최저가 없는 <strong>서울대 지균, 고려대 학추, 동국대 학추, 가천대 지균, 경기대 학추</strong> 등을 1차 타깃으로 삼고, 수능 모의고사 2~3등급이 안정적으로 나오는 학생은 <strong>연세대, 서강대, 성균관대, 중앙대, 시립대, 건국대</strong> 등을 교차 지원하여 합격 가능성을 극대화해야 합니다.
      </div>
    </div>
  `;
}

// 권장과목 질의 응답
function generateCourseRecommendationResponse(q) {
  let target = CURRICULUM_2022.tracks.find(t => q.includes(t.name) || q.includes(t.id));
  if (!target) {
    if (q.includes('컴') || q.includes('인공지능') || q.includes('소프트웨어') || q.includes('전자') || q.includes('반도체') || q.includes('공학')) {
      target = CURRICULUM_2022.tracks.find(t => t.id === 'eng');
    } else if (q.includes('의') || q.includes('약') || q.includes('간호') || q.includes('치')) {
      target = CURRICULUM_2022.tracks.find(t => t.id === 'med');
    } else if (q.includes('경영') || q.includes('경제') || q.includes('금융')) {
      target = CURRICULUM_2022.tracks.find(t => t.id === 'biz');
    } else {
      target = CURRICULUM_2022.tracks[1]; // default to engineering
    }
  }

  return `
    <div class="ai-res-box">
      <div class="ai-res-header">
        <span class="badge badge-accent">${target.icon} ${target.name}</span>
        <h4 style="margin:4px 0 0 0; font-size:18px; color:#0f2b5c;">
          2022 개정 교육과정 희망 전공별 핵심·권장 이수과목 가이드
        </h4>
        <p style="font-size:13px; color:#556688; margin-top:4px;">해당 학과군: ${target.desc}</p>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🚨 고2·고3 필수 선택 과목 (미이수 시 서류/정시 감점 리스크)</div>
        <div style="margin:10px 0;">
          <p><strong>🔴 핵심 필수과목:</strong> ${target.coreSubjects.map(s => `<span class="tag-core">${s}</span>`).join(' ')}</p>
          <p style="margin-top:8px;"><strong>🟡 권장 보완과목:</strong> ${target.recSubjects.map(s => `<span class="tag-rec-sub">${s}</span>`).join(' ')}</p>
        </div>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🏛️ 상위권 대학별 전공연계 권장과목 세부 지침</div>
        <ul class="styled-list">
          <li><strong>서울대:</strong> 자연/공학계열은 <span class="tag-core">미적분Ⅱ, 기하, 물리학</span> 이수 필수. 컴퓨터공학은 정보 및 인공지능 기초 적극 권장. 의예과는 <span class="tag-core">세포와 물질대사, 생물의 유전, 화학</span> 필수 이수!</li>
          <li><strong>고려대:</strong> 교과 80%+서류 20% 및 학종 서류평가에서 전공 관련 위계(일반선택 -> 진로선택 -> 융합선택) 이수 충실도 20~30% 정량/정성 반영.</li>
          <li><strong>성균관대:</strong> 교과 정성평가 30%에서 선택과목 이수 수월성 및 지원 모집단위 전공적합성 엄격 평가.</li>
          <li><strong>한양대:</strong> 교과 종합평가 40%에서 공과대학 지원자의 수학/물리 과목 성취도 및 세특 집중 검증.</li>
        </ul>
      </div>

      <div class="tip-box">
        💡 <strong>상담관 학업역량(세특) 전략:</strong><br>
        ${target.strategy}
      </div>
    </div>
  `;
}

// 내신 기반 추천 응답
function generateGpaRecommendationResponse(q) {
  const prof = STATE.userProfile;
  const gpa = prof.gpa;

  // 진단 분류
  const safeList = [];
  const fitList = [];
  const reachList = [];

  UNIV_25.forEach(u => {
    const safe = parseFloat(u.gyogwa.safeGrade5.split('~')[1] || u.gyogwa.safeGrade5);
    const fit = parseFloat(u.gyogwa.fitGrade5.split('~')[1] || u.gyogwa.fitGrade5);
    const reach = parseFloat(u.gyogwa.reachGrade5.split('~')[1] || u.gyogwa.reachGrade5);

    if (gpa <= safe) {
      safeList.push(u);
    } else if (gpa <= fit) {
      fitList.push(u);
    } else if (gpa <= reach) {
      reachList.push(u);
    }
  });

  return `
    <div class="ai-res-box">
      <div class="ai-res-header">
        <span class="badge badge-primary">경기도 일반고 5등급제</span>
        <h4 style="margin:4px 0 0 0; font-size:18px; color:#0f2b5c;">
          현재 내신 ${gpa.toFixed(2)}등급 기준 지원 가능 대학 & 전형 포트폴리오
        </h4>
        <p style="font-size:13px; color:#556688; margin-top:4px;">
          수능 모의고사(국${prof.csatKor} 수${prof.csatMath} 영${prof.csatEng}) 및 미인정 결석 ${prof.unexcusedAbsence}일 반영 진단
        </p>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🟢 [안정 지원권] 5등급제 기준 합격 확률 매우 높음 (80% 이상)</div>
        <p style="font-size:13px; line-height:1.6;">
          ${safeList.length ? safeList.map(u => `<strong>${u.name}</strong>(${u.gyogwa.name})`).join(', ') : '해당 등급대 안정권 대학은 상위 25개교 기준 다소 부족하므로 수능최저 충족 또는 학종을 적극 공략해야 합니다.'}
        </p>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🔵 [적정 지원권] 주력 지원 대학 (합격 확률 50~70%)</div>
        <p style="font-size:13px; line-height:1.6;">
          ${fitList.length ? fitList.map(u => `<strong>${u.name}</strong>(${u.gyogwa.name}, 최저: ${u.gyogwa.suneungMin})`).join('<br>') : '적정 대학 탐색 중'}
        </p>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">🟡 [소신/도전 지원권] 수능최저 충족 및 면접·세특 역전 노림 (30~50%)</div>
        <p style="font-size:13px; line-height:1.6;">
          ${reachList.slice(0, 6).map(u => `<strong>${u.name}</strong>(${u.gyogwa.name})`).join(', ')}
        </p>
      </div>

      <div class="tip-box">
        💡 <strong>상담관의 수시 6장 추천 배분 전략:</strong><br>
        • <strong>안정 1~2장:</strong> 가천대, 경기대, 단국대, 인하대 중 수능최저 확실하거나 면접 우세 전형 확보<br>
        • <strong>적정 2~3장:</strong> 아주대, 국민대, 숭실대, 세종대, 서울과기대, 홍익대, 동국대 중심 주력 지원<br>
        • <strong>소신 1~2장:</strong> 건국대, 경희대, 중앙대, 한양대, 성균관대 등 수능최저 3합 충족을 통한 상향 돌파
      </div>
    </div>
  `;
}

// 일반 상담 응답
function generateGeneralCounselingResponse(q) {
  const prof = STATE.userProfile;
  return `
    <div class="ai-res-box">
      <div class="ai-res-header">
        <span class="badge badge-accent">2028 맞춤 상담</span>
        <h4 style="margin:4px 0 0 0; font-size:18px; color:#0f2b5c;">
          2028학년도 대입 성공을 위한 경기도 일반고 로드맵 안내
        </h4>
      </div>

      <div class="ai-res-section">
        <p style="font-size:13.5px; line-height:1.7; color:#223355;">
          안녕하세요! 현재 2026년 고등학교 2학년 학생은 <strong>5등급제(1등급 10%, 2등급 24%, 3등급 32% 누적 66%)가 최초로 적용되는 2028학년도 대입의 첫 주인공</strong>입니다.
        </p>
        <div class="sec-title" style="margin-top:12px;">📌 2028 대입 상위 25개교의 4대 핵심 트렌드</div>
        <ul class="styled-list">
          <li><strong>1. 교과전형에 서류(세특)평가 대거 도입:</strong> 성균관대(30%), 한양대(40%), 서울시립대(40%), 동국대(30%), 건국대(30%), 숙명여대(30%), 숭실대(10%) 등 5등급제 내신 동점자 변별을 위해 학생부 세특이 결정적 평가 요소로 편입되었습니다.</li>
          <li><strong>2. 정시에서도 학생부 교과/정성평가 반영 확산:</strong> 서울대(40%), 고려대(20%), 서강대(10%), 한양대(10%), 시립대(20%), 동국대(20%), 단국대(10%), 홍익대(10%) 등 수능 100% 시대가 끝나고 정시에서도 학교생활 성실성이 요구됩니다.</li>
          <li><strong>3. 수능최저의 양극화:</strong> 서울대 지균, 고려대 학추는 수능최저를 전면 폐지한 반면, 연세대 논술, 건국대 교과, 광운대 교과는 수능최저를 신설하였습니다.</li>
          <li><strong>4. 2022 개정 권장과목 위계 준수:</strong> 미적분Ⅱ, 기하, 물리학, 화학, 세포와 물질대사 등 지원 전공에 맞는 진로/융합선택 과목 미이수 시 치명적 감점이 부여됩니다.</li>
        </ul>
      </div>

      <div class="ai-res-section">
        <div class="sec-title">💡 자주 묻는 추천 질문 바로가기</div>
        <div class="prompt-chips-wrap">
          <button class="chip-btn" onclick="handleSendChat('연세대랑 고려대 2028 교과전형 비교해줘')">연세대 vs 고려대 2028 교과 비교</button>
          <button class="chip-btn" onclick="handleSendChat('미인정 지각 4번인데 감점되는 대학은 어디야?')">미인정 지각/출결 감점 기준</button>
          <button class="chip-btn" onclick="handleSendChat('수능 최저 없는 인서울 교과전형 추천해줘')">수능최저 없는 교과 대학</button>
          <button class="chip-btn" onclick="handleSendChat('컴퓨터공학과 가려면 고2 고3 때 무슨 과목 들어야 해?')">컴퓨터/AI학과 필수 권장과목</button>
          <button class="chip-btn" onclick="handleSendChat('내신 1.65등급인데 지원 가능한 대학 알려줘')">내신 1.65등급 추천 대학</button>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// [모듈 2] 📊 5등급제 내신·출결·수능최저 통합 시뮬레이터
// ─────────────────────────────────────────────────────────────

function runSimulator() {
  const gpaInput = parseFloat(document.getElementById('sim-gpa').value) || 1.65;
  STATE.userProfile.gpa = gpaInput;

  const abs = parseInt(document.getElementById('sim-abs').value) || 0;
  const late = parseInt(document.getElementById('sim-late').value) || 0;
  const early = parseInt(document.getElementById('sim-early').value) || 0;
  const res = parseInt(document.getElementById('sim-res').value) || 0;

  STATE.userProfile.unexcusedAbsence = abs;
  STATE.userProfile.unexcusedTardiness = late;
  STATE.userProfile.unexcusedEarlyLeave = early;
  STATE.userProfile.unexcusedResult = res;

  const totalLate = late + early + res;

  // 수능 모의고사 등급
  const csatKor = parseInt(document.getElementById('sim-csat-kor').value) || 2;
  const csatMath = parseInt(document.getElementById('sim-csat-math').value) || 2;
  const csatEng = parseInt(document.getElementById('sim-csat-eng').value) || 2;
  const csatHist = parseInt(document.getElementById('sim-csat-hist').value) || 2;
  const csatSoc = parseInt(document.getElementById('sim-csat-soc').value) || 3;
  const csatSci = parseInt(document.getElementById('sim-csat-sci').value) || 2;

  STATE.userProfile.csatKor = csatKor;
  STATE.userProfile.csatMath = csatMath;
  STATE.userProfile.csatEng = csatEng;
  STATE.userProfile.csatHist = csatHist;
  STATE.userProfile.csatSoc = csatSoc;
  STATE.userProfile.csatSci = csatSci;

  // 9등급제 추정 환산치 업데이트
  updatePercentileEstimate(gpaInput);

  // 결과 그리드 렌더링
  const tbody = document.getElementById('sim-result-tbody');
  if (!tbody) return;

  tbody.innerHTML = UNIV_25.map(u => {
    // 1. 대학별 환산 점수 계산
    const calcScore = calculateUnivScore(u, gpaInput);

    // 2. 출결 감점 여부 계산
    const attResult = checkAttendancePenalty(u, abs, totalLate);

    // 3. 수능최저 충족 여부 판정
    const csatResult = checkSuneungMin(u, {
      kor: csatKor, math: csatMath, eng: csatEng, hist: csatHist, soc: csatSoc, sci: csatSci
    });

    // 4. 지원 합격 가능성 판정
    const diag = evaluateAdmissionPossibility(u, gpaInput, csatResult.met);

    return `
      <tr>
        <td>
          <div style="font-weight:800; color:#0f2b5c; font-size:14px;">${u.name}</div>
          <span style="font-size:11px; color:#6b7c98;">${u.region} · ${u.type}</span>
        </td>
        <td>
          <div style="font-size:12.5px; font-weight:700;">${u.gyogwa.name}</div>
          <div style="font-size:11px; color:#5b6e8a;">${u.gyogwa.method}</div>
        </td>
        <td style="text-align:center;">
          <div style="font-size:14px; font-weight:800; color:#1a4db8;">${calcScore.scoreStr}</div>
          <small style="color:#778899; font-size:10.5px;">${calcScore.formulaNote}</small>
        </td>
        <td style="text-align:center;">
          <span class="badge ${attResult.isDeducted ? 'badge-danger' : 'badge-success'}">
            ${attResult.label}
          </span>
          <div style="font-size:10.5px; color:#556677; margin-top:2px;">${attResult.desc}</div>
        </td>
        <td style="text-align:center;">
          <span class="badge ${csatResult.badgeClass}">
            ${csatResult.statusText}
          </span>
          <div style="font-size:11px; color:#445566; margin-top:2px;">${u.gyogwa.suneungMin}</div>
        </td>
        <td style="text-align:center;">
          <div style="font-size:12px; color:#334455;">
            안정: ${u.gyogwa.safeGrade5}<br>
            적정: ${u.gyogwa.fitGrade5}
          </div>
        </td>
        <td style="text-align:center;">
          <span class="diag-tag diag-${diag.type}">
            ${diag.label}
          </span>
          <div style="font-size:10.5px; color:#556688; margin-top:3px;">${diag.subText}</div>
        </td>
        <td style="text-align:center;">
          <button class="btn-table-action" onclick="askAiAboutUniv('${u.id}')">🤖 AI 정밀상담</button>
        </td>
      </tr>
    `;
  }).join('');
}

// 5등급제 ↔ 9등급제 추정 백분위 환산
function updatePercentileEstimate(g5) {
  // 5등급제 비율: 1등급 10%, 2등급 24%(누적 34%), 3등급 32%(누적 66%), 4등급 24%(누적 90%), 5등급 10%(누적 100%)
  // 9등급제 비율: 1등급 4%, 2등급 7%(11%), 3등급 12%(23%), 4등급 17%(40%), 5등급 20%(60%), 6등급 17%(77%), 7등급 12%(89%), 8등급 7%(96%), 9등급 4%(100%)
  let pct = 0;
  let g9_est = '';
  if (g5 <= 1.0) {
    pct = 1.0; g9_est = '1.0 ~ 1.2등급';
  } else if (g5 <= 1.5) {
    pct = 1.0 + (g5 - 1.0) * 18.0; // 1% ~ 10%
    g9_est = '1.2 ~ 1.8등급';
  } else if (g5 <= 2.0) {
    pct = 10.0 + (g5 - 1.5) * 48.0; // 10% ~ 34%
    g9_est = '1.8 ~ 2.6등급';
  } else if (g5 <= 2.5) {
    pct = 34.0 + (g5 - 2.0) * 32.0; // 34% ~ 50%
    g9_est = '2.6 ~ 3.5등급';
  } else if (g5 <= 3.0) {
    pct = 50.0 + (g5 - 2.5) * 32.0; // 50% ~ 66%
    g9_est = '3.5 ~ 4.5등급';
  } else {
    pct = 66.0 + (g5 - 3.0) * 34.0;
    g9_est = '4.5등급 이하';
  }

  const badgeEl = document.getElementById('est-percentile-badge');
  if (badgeEl) {
    badgeEl.innerHTML = `5등급제 <strong>${g5.toFixed(2)}등급</strong> ➔ 상위 누적 약 <strong>${pct.toFixed(1)}%</strong> (구 9등급제 환산 약 <strong>${g9_est}</strong> 수준)`;
  }
}

// 대학별 5등급제 환산점수 계산
function calculateUnivScore(u, gpa) {
  // 서강대 공식: (5 - 과목별 등급평균) * 200 (800점 만점) + 성취도(100점)
  if (u.id === 'sogang') {
    const raw = Math.max(0, (5.0 - gpa) * 200);
    const score = raw + 100; // 성취도 A 가정
    return { scoreStr: `${score.toFixed(1)}점 / 900`, formulaNote: '(5-등급)×200+성취도' };
  }

  // 고려대: 1등급 100, 2등급 95, 3등급 83, 4등급 67, 5등급 55
  if (u.id === 'korea') {
    let s = 100;
    if (gpa <= 1.0) s = 100;
    else if (gpa <= 2.0) s = 100 - (gpa - 1.0) * 5;
    else if (gpa <= 3.0) s = 95 - (gpa - 2.0) * 12;
    else if (gpa <= 4.0) s = 83 - (gpa - 3.0) * 16;
    else s = 67 - (gpa - 4.0) * 12;
    return { scoreStr: `${s.toFixed(2)}점 / 100`, formulaNote: '1등:100, 2등:95, 3등:83' };
  }

  // 동국대: 2학년 이상 상위 10과목 (성취도 A면 2등급도 10.0 만점)
  if (u.id === 'dongguk') {
    const s = gpa <= 1.8 ? 100.0 : Math.max(70, 100 - (gpa - 1.8) * 15);
    return { scoreStr: `${s.toFixed(1)}점 / 100`, formulaNote: '상위10과목(A-2도 10점)' };
  }

  // 가천대: 10과목 제외, 1등급 100, 2등급 99, 3등급 98
  if (u.id === 'gachon') {
    let s = 100;
    if (gpa <= 2.0) s = 100 - (gpa - 1.0) * 1.0;
    else if (gpa <= 3.0) s = 99 - (gpa - 2.0) * 1.0;
    else s = 98 - (gpa - 3.0) * 18.0;
    return { scoreStr: `${s.toFixed(2)}점 / 100`, formulaNote: '10과목 제외(1~3등급 1점차)' };
  }

  // 서울과기대: 1등급 1000, 2등급 990, 3등급 977, 4등급 967
  if (u.id === 'seoultech') {
    let s = 1000;
    if (gpa <= 2.0) s = 1000 - (gpa - 1.0) * 10;
    else if (gpa <= 3.0) s = 990 - (gpa - 2.0) * 13;
    else s = 977 - (gpa - 3.0) * 10;
    return { scoreStr: `${s.toFixed(1)}점 / 1000`, formulaNote: '1등:1000, 2등:990, 3등:977' };
  }

  // 단국대: 1등급 100, 2등급 90, 3등급 80 (1등급당 10점 차감)
  if (u.id === 'dankook') {
    const s = Math.max(60, 100 - (gpa - 1.0) * 10);
    return { scoreStr: `${s.toFixed(1)}점 / 100`, formulaNote: '1등급당 10점 균등 차감' };
  }

  // 기본 표준 환산
  const s = Math.max(0, 100 - (gpa - 1.0) * 8.5);
  return { scoreStr: `${s.toFixed(1)}점 / 100`, formulaNote: '5등급제 표준 변환' };
}

// 출결 감점 여부 체크
function checkAttendancePenalty(u, abs, totalLate) {
  // 경희대: 지각 2회 = 결석 1일
  if (u.id === 'khu') {
    const convertedAbs = abs + Math.floor(totalLate / 2);
    if (convertedAbs <= 2) {
      return { isDeducted: false, label: '무감점 (만점)', desc: `환산결석 ${convertedAbs}일 (2일 이하 만점)` };
    } else {
      return { isDeducted: true, label: '감점 발생 ⚠️', desc: `환산결석 ${convertedAbs}일 (지각2회=1일로 3일 초과 감점)` };
    }
  }

  // 이화여대: 미인정 결석 1일 이하 만점 (지각 3회=1일)
  if (u.id === 'ewha') {
    const convertedAbs = abs + Math.floor(totalLate / 3);
    if (convertedAbs <= 1) {
      return { isDeducted: false, label: '무감점 (50점)', desc: `환산결석 ${convertedAbs}일 (1일 이하 만점)` };
    } else {
      const penalty = convertedAbs <= 3 ? 10 : 20;
      return { isDeducted: true, label: `-${penalty}점 감점 ⚠️`, desc: `환산결석 ${convertedAbs}일 (1일 초과 감점)` };
    }
  }

  // 서강대 / 아주대: 결석 0~3일 만점 (지각 3회=1일)
  if (u.id === 'sogang' || u.id === 'ajou') {
    const convertedAbs = abs + Math.floor(totalLate / 3);
    if (convertedAbs <= 3) {
      return { isDeducted: false, label: '무감점 (만점)', desc: `환산결석 ${convertedAbs}일 (3일 이하 만점)` };
    } else {
      return { isDeducted: true, label: '감점 발생 ⚠️', desc: `환산결석 ${convertedAbs}일 (4일 이상 감점)` };
    }
  }

  // 숙명여대: 정시에서 결석 3일 이하 무감점 (지각 미반영)
  if (u.id === 'sookmyung') {
    if (abs <= 3) {
      return { isDeducted: false, label: '무감점', desc: `결석 ${abs}일 (3일 이하 무감점)` };
    } else {
      return { isDeducted: true, label: '-1~5점 감점 ⚠️', desc: `결석 ${abs}일 (4일 이상 감점)` };
    }
  }

  // 출결 미반영 대학
  if (u.gyogwa.attendanceCalcType === 'none') {
    return { isDeducted: false, label: '출결 미반영', desc: '교과 100% 전형 (출결 영향 없음)' };
  }

  // 서류 종합평가 대학 (서울대, 연세대, 고려대, 성균관대 등)
  const convertedAbs = abs + Math.floor(totalLate / 3);
  if (convertedAbs === 0 && totalLate < 3) {
    return { isDeducted: false, label: '정성평가 안전', desc: '결석/지각 없음 (인성/성실성 우수)' };
  } else if (convertedAbs <= 2) {
    return { isDeducted: false, label: '정성평가 경미', desc: '경미한 사유 소명 시 영향 최소' };
  } else {
    return { isDeducted: true, label: '서류 감점 우려 ⚠️', desc: `결석 ${abs}일/지각 ${totalLate}회로 성실성 감점 가능` };
  }
}

// 수능 최저 충족 판정
function checkSuneungMin(u, grades) {
  const minText = u.gyogwa.suneungMin;

  if (minText.includes('없음') || minText.includes('폐지')) {
    return { met: true, statusText: '최저 없음 (면제)', badgeClass: 'badge-free' };
  }

  // 고려대 의대만 최저
  if (u.id === 'korea') {
    return { met: true, statusText: '일반과 최저 없음!', badgeClass: 'badge-free' };
  }

  // 서울대 지균 최저 폐지
  if (u.id === 'snu') {
    return { met: true, statusText: '최저 폐지! (자유)', badgeClass: 'badge-free' };
  }

  // 가천대: 2합 6 (국/수 포함 시 실질 2합 7)
  if (u.id === 'gachon') {
    const list = [grades.kor, grades.math, grades.eng, Math.min(grades.soc, grades.sci)].sort((a,b)=>a-b);
    const sum2 = list[0] + list[1];
    const isMet = sum2 <= 6 || (grades.kor <= 3 || grades.math <= 3) && sum2 <= 7;
    return { met: isMet, statusText: isMet ? '충족 (실질 2합7)' : '미충족', badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 경기대: 2합 7 (영어 2등급=1등급 간주)
  if (u.id === 'kyonggi') {
    const effEng = grades.eng === 2 ? 1 : grades.eng;
    const list = [grades.kor, grades.math, effEng, Math.min(grades.soc, grades.sci)].sort((a,b)=>a-b);
    const sum2 = list[0] + list[1];
    const isMet = sum2 <= 7;
    return { met: isMet, statusText: isMet ? '충족 (영어특례)' : '미충족', badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 중앙대: 3합 7 (영어 2등급 20% 미만 시 1등급 간주, 과탐 2등급=1등급 간주)
  if (u.id === 'cau') {
    const effEng = grades.eng <= 2 ? 1 : grades.eng;
    const effSci = grades.sci <= 2 ? 1 : grades.sci;
    const list = [grades.kor, grades.math, effEng, grades.soc, effSci].sort((a,b)=>a-b);
    const sum3 = list[0] + list[1] + list[2];
    const isMet = sum3 <= 7;
    return { met: isMet, statusText: isMet ? `충족 (3합 ${sum3})` : `미충족 (3합 ${sum3})`, badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 한양대: 3개 각 3등급 이내
  if (u.id === 'hanyang') {
    const qualifyCount = [grades.kor, grades.math, grades.eng, Math.min(grades.soc, grades.sci)].filter(g => g <= 3).length;
    const isMet = qualifyCount >= 3;
    return { met: isMet, statusText: isMet ? `충족 (3개 영역 3이내)` : '미충족', badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 서강대/이화여대: 3개 각 3등급 or 3합 7
  if (u.id === 'sogang') {
    const qualifyCount = [grades.kor, grades.math, grades.eng, Math.min(grades.soc, grades.sci)].filter(g => g <= 3).length;
    const isMet = qualifyCount >= 3;
    return { met: isMet, statusText: isMet ? '충족 (각 3등급 이내)' : '미충족', badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 건국대: 한국사 포함 5개 중 3합 8
  if (u.id === 'konkuk') {
    const list = [grades.kor, grades.math, grades.eng, grades.hist, Math.min(grades.soc, grades.sci)].sort((a,b)=>a-b);
    const sum3 = list[0] + list[1] + list[2];
    const isMet = sum3 <= 8;
    return { met: isMet, statusText: isMet ? `충족 (3합 ${sum3})` : `미충족 (3합 ${sum3})`, badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 일반 2합 5 (경희대, 홍익대, 세종대 등)
  if (minText.includes('2개 영역 등급 합 5') || minText.includes('2합 5')) {
    const list = [grades.kor, grades.math, grades.eng, Math.min(grades.soc, grades.sci)].sort((a,b)=>a-b);
    const sum2 = list[0] + list[1];
    const isMet = sum2 <= 5;
    return { met: isMet, statusText: isMet ? `충족 (2합 ${sum2})` : `미충족 (2합 ${sum2})`, badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 일반 2합 6 (국민대, 숭실대, 서울과기대, 인하대 등)
  if (minText.includes('2합 6') || minText.includes('등급 합 6')) {
    const list = [grades.kor, grades.math, grades.eng, Math.min(grades.soc, grades.sci)].sort((a,b)=>a-b);
    const sum2 = list[0] + list[1];
    const isMet = sum2 <= 6;
    return { met: isMet, statusText: isMet ? `충족 (2합 ${sum2})` : `미충족 (2합 ${sum2})`, badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  // 3합 7 (시립대, 성균관대 등)
  if (minText.includes('3합 7') || minText.includes('등급 합 7')) {
    const list = [grades.kor, grades.math, grades.eng, grades.soc, grades.sci].sort((a,b)=>a-b);
    const sum3 = list[0] + list[1] + list[2];
    const isMet = sum3 <= 7;
    return { met: isMet, statusText: isMet ? `충족 (3합 ${sum3})` : `미충족 (3합 ${sum3})`, badgeClass: isMet ? 'badge-success' : 'badge-danger' };
  }

  return { met: true, statusText: '확인 요망', badgeClass: 'badge-outline' };
}

// 지원 가능성 종합 평가
function evaluateAdmissionPossibility(u, gpa, csatMet) {
  const safe = parseFloat(u.gyogwa.safeGrade5.split('~')[1] || u.gyogwa.safeGrade5);
  const fit = parseFloat(u.gyogwa.fitGrade5.split('~')[1] || u.gyogwa.fitGrade5);
  const reach = parseFloat(u.gyogwa.reachGrade5.split('~')[1] || u.gyogwa.reachGrade5);

  if (!csatMet) {
    return { type: 'danger', label: '수능최저 미달', subText: '수능 모의 성적 보완 필수' };
  }

  if (gpa <= safe) {
    return { type: 'safe', label: '안정 합격권', subText: '교과 최초합 기대' };
  } else if (gpa <= fit) {
    return { type: 'fit', label: '적정 지원권', subText: '교과/학종 주력 라인' };
  } else if (gpa <= reach) {
    return { type: 'reach', label: '소신 도전권', subText: '세특/서류평가 역전 기대' };
  } else {
    return { type: 'warn', label: '상향/학종 추천', subText: '교과보다는 종합·논술 유리' };
  }
}

// 샘플 성적표 원클릭 로드
function loadSampleProfile(type) {
  if (type === 'top') {
    document.getElementById('sim-gpa').value = '1.18';
    document.getElementById('sim-abs').value = '0';
    document.getElementById('sim-late').value = '0';
    document.getElementById('sim-csat-kor').value = '1';
    document.getElementById('sim-csat-math').value = '1';
    document.getElementById('sim-csat-eng').value = '1';
    document.getElementById('sim-csat-hist').value = '1';
    document.getElementById('sim-csat-soc').value = '1';
    document.getElementById('sim-csat-sci').value = '1';
  } else if (type === 'mid') {
    document.getElementById('sim-gpa').value = '1.65';
    document.getElementById('sim-abs').value = '0';
    document.getElementById('sim-late').value = '2';
    document.getElementById('sim-csat-kor').value = '2';
    document.getElementById('sim-csat-math').value = '2';
    document.getElementById('sim-csat-eng').value = '2';
    document.getElementById('sim-csat-hist').value = '2';
    document.getElementById('sim-csat-soc').value = '3';
    document.getElementById('sim-csat-sci').value = '2';
  } else if (type === 'grow') {
    document.getElementById('sim-gpa').value = '2.35';
    document.getElementById('sim-abs').value = '1';
    document.getElementById('sim-late').value = '4';
    document.getElementById('sim-csat-kor').value = '3';
    document.getElementById('sim-csat-math').value = '3';
    document.getElementById('sim-csat-eng').value = '2';
    document.getElementById('sim-csat-hist').value = '2';
    document.getElementById('sim-csat-soc').value = '3';
    document.getElementById('sim-csat-sci').value = '3';
  }
  runSimulator();
}

function askAiAboutUniv(univId) {
  const u = UNIV_25.find(x => x.id === univId);
  if (!u) return;
  switchTab('chat');
  handleSendChat(`${u.name} 2028학년도 수시 전형방법, 출결 감점, 5등급제 안정권 등급 자세히 분석해줘`);
}

// ─────────────────────────────────────────────────────────────
// [모듈 3] 🏛️ 25개 대학 상세 전형 백과사전 & 비교 분석기
// ─────────────────────────────────────────────────────────────

function addUniversityToCompare(univId) {
  if (STATE.compareList.includes(univId)) {
    alert('이미 비교 목록에 추가되어 있습니다.');
    return;
  }
  if (STATE.compareList.length >= 4) {
    STATE.compareList.shift(); // 최대 4개
  }
  STATE.compareList.push(univId);
  switchTab('compare');
}

function removeCompareUniv(univId) {
  STATE.compareList = STATE.compareList.filter(id => id !== univId);
  renderCompareView();
  renderUnivEncyclopedia();
}

function renderCompareView() {
  const container = document.getElementById('compare-matrix-container');
  if (!container) return;

  const univList = STATE.compareList.map(id => UNIV_25.find(u => u.id === id)).filter(Boolean);

  const chipsEl = document.getElementById('compare-tray-chips');
  if (chipsEl) {
    chipsEl.innerHTML = univList.map(u => `
      <span class="compare-chip">
        ${u.name}
        <button class="btn-remove" onclick="removeCompareUniv('${u.id}')" title="삭제">✕</button>
      </span>
    `).join('') || '<span style="font-size:12px; color:#64748b;">선택된 대학 없음</span>';
  }

  if (!univList.length) {
    container.innerHTML = '<div style="padding:40px; text-align:center; color:#64748b; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px;">비교할 대학을 아래 카드에서 선택해주세요 (최대 4개)</div>';
    return;
  }

  container.innerHTML = `
    <div style="overflow-x:auto;">
      <table class="ai-compare-table">
        <thead>
          <tr>
            <th style="min-width:140px;">구분 항목</th>
            ${univList.map(u => `
              <th style="min-width:260px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>${u.name}</span>
                  <button class="btn-remove" onclick="removeCompareUniv('${u.id}')" title="제거">✕</button>
                </div>
                <small style="font-weight:400; color:#5b7095;">${u.region} · ${u.tier}위권</small>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>수시 교과 전형명</strong></td>
            ${univList.map(u => `<td><strong>${u.gyogwa.name}</strong> (${u.gyogwa.quota})</td>`).join('')}
          </tr>
          <tr>
            <td><strong>전형 방법</strong></td>
            ${univList.map(u => `<td>${u.gyogwa.method}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>추천 인원 제한</strong></td>
            ${univList.map(u => `<td><span class="tag-rec">${u.gyogwa.recLimit}</span></td>`).join('')}
          </tr>
          <tr>
            <td><strong>5등급제 반영 공식</strong></td>
            ${univList.map(u => `<td><small>${u.gyogwa.gradeTable5}</small></td>`).join('')}
          </tr>
          <tr>
            <td><strong>출결 감점 기준</strong></td>
            ${univList.map(u => `<td><span class="tag-warn">${u.gyogwa.attendanceRule}</span></td>`).join('')}
          </tr>
          <tr>
            <td><strong>2028 수능 최저</strong></td>
            ${univList.map(u => `<td><span class="tag-suneung">${u.gyogwa.suneungMin}</span></td>`).join('')}
          </tr>
          <tr>
            <td><strong>5등급제 합격 가이드</strong></td>
            ${univList.map(u => `<td>
              안정: <strong style="color:#0f7a3c;">${u.gyogwa.safeGrade5}등급</strong><br>
              적정: <strong style="color:#1a4db8;">${u.gyogwa.fitGrade5}등급</strong><br>
              소신: <strong style="color:#d97706;">${u.gyogwa.reachGrade5}등급</strong>
            </td>`).join('')}
          </tr>
          <tr>
            <td><strong>대표 학종</strong></td>
            ${univList.map(u => `<td>${u.jonghap.map(j => `<strong>${j.name}</strong><br><small>${j.method} (최저: ${j.suneungMin})</small>`).join('<hr style="margin:4px 0; border:none; border-top:1px dashed #dae2f0;">')}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>정시 학생부 반영</strong></td>
            ${univList.map(u => `<td><strong>${u.jeongsi.studentRecordReflection}</strong></td>`).join('')}
          </tr>
          <tr>
            <td><strong>권장 이수과목</strong></td>
            ${univList.map(u => `<td><small><strong>자연:</strong> ${u.recSubjects.natural}<br><strong>공학:</strong> ${u.recSubjects.engineering}</small></td>`).join('')}
          </tr>
          <tr>
            <td><strong>공식 문서 링크</strong></td>
            ${univList.map(u => `
              <td>
                <div class="btn-group-mini">
                  <a class="btn-mini btn-pdf" href="${u.pdf2028Url}" target="_blank">📄 2028 시행계획</a>
                  <a class="btn-mini btn-home" href="${u.homeUrl}" target="_blank">🏫 입학처</a>
                </div>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

let encyclopediaSearch = '';
let encyclopediaRegion = 'ALL';

function renderUnivEncyclopedia() {
  const gridEl = document.getElementById('univ-encyclopedia-grid');
  if (!gridEl) return;

  const filtered = UNIV_25.filter(u => {
    const matchReg = encyclopediaRegion === 'ALL' || u.region.includes(encyclopediaRegion);
    const matchTxt = !encyclopediaSearch || 
      u.name.toLowerCase().includes(encyclopediaSearch.toLowerCase()) || 
      u.gyogwa.name.toLowerCase().includes(encyclopediaSearch.toLowerCase()) ||
      u.gyogwa.suneungMin.toLowerCase().includes(encyclopediaSearch.toLowerCase());
    return matchReg && matchTxt;
  });

  const countBadge = document.getElementById('encyclopedia-count-badge');
  if (countBadge) countBadge.textContent = `${filtered.length}개교 표시 중`;

  gridEl.innerHTML = filtered.map(u => {
    const isInCompare = STATE.compareList.includes(u.id);
    return `
      <div class="univ-card ${isInCompare ? 'in-compare' : ''}">
        <div class="univ-card-top">
          <div>
            <span class="badge badge-primary">${u.region}</span>
            <span class="badge badge-accent">${u.tier}위권</span>
            <span class="badge badge-outline">${u.type}</span>
          </div>
          <button class="btn-card-compare ${isInCompare ? 'btn-active' : ''}" onclick="toggleCompareUniv('${u.id}')">
            ${isInCompare ? '✓ 비교함 담김' : '+ 비교함 추가'}
          </button>
        </div>
        <div class="univ-card-name">${u.name}</div>
        <div class="univ-card-gyogwa">
          <strong>교과:</strong> ${u.gyogwa.name} (${u.gyogwa.quota})
        </div>
        <div class="univ-card-details">
          <div><strong>수능최저:</strong> <span class="tag-suneung">${u.gyogwa.suneungMin}</span></div>
          <div><strong>출결기준:</strong> <span class="tag-warn">${u.gyogwa.attendanceRule}</span></div>
          <div><strong>합격선(안정/적정):</strong> <strong style="color:#0f7a3c;">${u.gyogwa.safeGrade5}등급</strong> / <strong style="color:#1a4db8;">${u.gyogwa.fitGrade5}등급</strong></div>
          <div style="font-size:11px; color:#5b7095; margin-top:4px;"><strong>2028 변경:</strong> ${u.changes2028[0]}</div>
        </div>
        <div class="univ-card-actions">
          <button class="btn btn-outline" style="font-size:11.5px; padding:6px 10px;" onclick="askAiAboutUniv('${u.id}')">🤖 AI 입시 질문</button>
          <a class="btn btn-pdf" style="font-size:11.5px; padding:6px 10px;" href="${u.pdf2028Url}" target="_blank" rel="noopener">📄 2028 시행계획</a>
          <a class="btn btn-home" style="font-size:11.5px; padding:6px 10px;" href="${u.homeUrl}" target="_blank" rel="noopener">🏫 입학처</a>
        </div>
      </div>
    `;
  }).join('');
}

function filterEncyclopedia(val) {
  encyclopediaSearch = val.trim();
  renderUnivEncyclopedia();
}

function filterEncyclopediaRegion(reg) {
  encyclopediaRegion = reg;
  document.querySelectorAll('.encyclopedia-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.region === reg);
  });
  renderUnivEncyclopedia();
}

function toggleCompareUniv(univId) {
  if (STATE.compareList.includes(univId)) {
    removeCompareUniv(univId);
  } else {
    addUniversityToCompare(univId);
  }
}

// ─────────────────────────────────────────────────────────────
// [모듈 4] 📚 2022 개정 교육과정 계열별 권장과목 & 세특 플래너
// ─────────────────────────────────────────────────────────────

function renderCurriculumTrack() {
  const trackId = document.getElementById('curriculum-track-select')?.value || STATE.userProfile.targetTrack;
  STATE.userProfile.targetTrack = trackId;

  const track = CURRICULUM_2022.tracks.find(t => t.id === trackId);
  if (!track) return;

  const titleEl = document.getElementById('track-title');
  const descEl = document.getElementById('track-desc');
  const checklistEl = document.getElementById('track-checklist');
  const scoreEl = document.getElementById('track-score-badge');
  const strategyEl = document.getElementById('track-strategy-box');

  if (titleEl) titleEl.innerHTML = `${track.icon} ${track.name}`;
  if (descEl) descEl.textContent = `관련 학과: ${track.desc}`;

  if (strategyEl) {
    strategyEl.innerHTML = `
      <div class="tip-box">
        💡 <strong>${track.name} 세특 및 학업역량 핵심 전략:</strong><br>
        ${track.strategy}
      </div>
    `;
  }

  // 체크리스트 렌더링
  if (checklistEl) {
    const allReq = [
      ...track.coreSubjects.map(s => ({ name: s, type: 'core' })),
      ...track.recSubjects.map(s => ({ name: s, type: 'rec' }))
    ];

    checklistEl.innerHTML = allReq.map(item => {
      const isChecked = STATE.userProfile.selectedCourses.includes(item.name);
      return `
        <label class="course-check-item ${item.type === 'core' ? 'is-core' : ''}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleCourseSelection('${item.name}')">
          <span class="chk-label">
            <strong>${item.name}</strong>
            <span class="badge ${item.type === 'core' ? 'badge-danger' : 'badge-warning'}">
              ${item.type === 'core' ? '핵심 필수' : '권장 보완'}
            </span>
          </span>
        </label>
      `;
    }).join('');

    // 충실도 계산
    const coreCount = track.coreSubjects.filter(s => STATE.userProfile.selectedCourses.includes(s)).length;
    const recCount = track.recSubjects.filter(s => STATE.userProfile.selectedCourses.includes(s)).length;
    const totalScore = Math.round((coreCount * 15 + recCount * 5) / (track.coreSubjects.length * 15 + track.recSubjects.length * 5) * 100);

    if (scoreEl) {
      scoreEl.innerHTML = `전공 이수 충실도: <strong>${totalScore}점 / 100점</strong> (필수 ${coreCount}/${track.coreSubjects.length}과목, 권장 ${recCount}/${track.recSubjects.length}과목 이수)`;
    }
  }
}

function toggleCourseSelection(courseName) {
  const idx = STATE.userProfile.selectedCourses.indexOf(courseName);
  if (idx >= 0) {
    STATE.userProfile.selectedCourses.splice(idx, 1);
  } else {
    STATE.userProfile.selectedCourses.push(courseName);
  }
  renderCurriculumTrack();
}

// 세특 플래너 로컬스토리지 저장 및 불러오기
function savePlannerData() {
  const g2s1 = document.getElementById('plan-g2s1')?.value || '';
  const g2s2 = document.getElementById('plan-g2s2')?.value || '';
  const g3s1 = document.getElementById('plan-g3s1')?.value || '';

  const data = { g2s1, g2s2, g3s1, updatedAt: new Date().toISOString() };
  localStorage.setItem('plan_2028_student_record', JSON.stringify(data));
  alert('✅ 세특 학업역량 플래너가 성공적으로 저장되었습니다!');
}

function loadPlannerData() {
  try {
    const raw = localStorage.getItem('plan_2028_student_record');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (document.getElementById('plan-g2s1')) document.getElementById('plan-g2s1').value = data.g2s1 || '';
    if (document.getElementById('plan-g2s2')) document.getElementById('plan-g2s2').value = data.g2s2 || '';
    if (document.getElementById('plan-g3s1')) document.getElementById('plan-g3s1').value = data.g3s1 || '';
  } catch (e) {}
}

// ─────────────────────────────────────────────────────────────
// [모듈 5] 🧭 경기진학지도협의회 대학 정보 나침반 아카이브
// ─────────────────────────────────────────────────────────────

let archiveRegion = 'ALL';
let archiveSearch = '';

function renderCompassArchive() {
  if (typeof MERGED === 'undefined') return;

  const btnContainer = document.getElementById('archive-region-btns');
  if (btnContainer && !btnContainer.innerHTML) {
    const regList = ['ALL', '서울', '경기', '인천', '강원', '대전', '충북', '충남', '대구', '경북', '부산', '경남', '울산', '광주', '전북', '전남', '제주'];
    btnContainer.innerHTML = regList.map(r => `
      <button class="rbtn ${r === archiveRegion ? 'on' : ''}" onclick="setArchiveRegion('${r}')">${r === 'ALL' ? '전체' : r}</button>
    `).join('');
  }

  const filtered = MERGED.filter(u => {
    const matchReg = archiveRegion === 'ALL' || u.region === archiveRegion;
    const matchTxt = !archiveSearch || u.name.includes(archiveSearch) || (u.region && u.region.includes(archiveSearch));
    return matchReg && matchTxt;
  });

  const countEl = document.getElementById('archive-count');
  if (countEl) countEl.textContent = `총 ${filtered.length}개 대학 수록`;

  const bodyEl = document.getElementById('archive-cards-body');
  if (!bodyEl) return;

  bodyEl.innerHTML = filtered.map(u => `
    <div class="card">
      <div class="card-top">
        <span class="badge badge-outline" style="font-size:10px;">${u.region}</span>
        <div class="card-name">${u.name}</div>
      </div>
      <div class="card-btns">
        ${u.homeUrl ? `<a class="link-btn btn-home" href="${u.homeUrl}" target="_blank" rel="noopener">🏫 입학처 홈</a>` : `<span class="link-btn btn-disabled">입학처 없음</span>`}
        ${u.pdfUrl ? `<a class="link-btn btn-pdf" href="${u.pdfUrl}" target="_blank" rel="noopener">📄 2028 시행계획</a>` : `<span class="link-btn btn-disabled">시행계획 준비중</span>`}
        ${u.recruitUrl ? `<a class="link-btn btn-recruit" href="${u.recruitUrl}" target="_blank" rel="noopener">📋 2027 모집요강</a>` : `<span class="link-btn btn-disabled">요강 준비중</span>`}
      </div>
    </div>
  `).join('');
}

function setArchiveRegion(r) {
  archiveRegion = r;
  document.querySelectorAll('#archive-region-btns .rbtn').forEach(btn => {
    btn.classList.toggle('on', btn.textContent === (r === 'ALL' ? '전체' : r));
  });
  renderCompassArchive();
}

function handleArchiveSearch(val) {
  archiveSearch = val.trim();
  renderCompassArchive();
}

// ─────────────────────────────────────────────────────────────
// 초기화 및 이벤트 리스너 등록
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // 엔터키 전송
  const inputEl = document.getElementById('chat-input');
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendChat();
      }
    });
  }

  // 시뮬레이터 슬라이더/인풋 동기화
  const gpaInput = document.getElementById('sim-gpa');
  if (gpaInput) {
    gpaInput.addEventListener('input', runSimulator);
  }

  // 플래너 로드
  loadPlannerData();

  // 기본 시뮬레이터 및 모듈 초기 렌더링
  runSimulator();
  renderCompareView();
  renderUnivEncyclopedia();
  renderCurriculumTrack();
  renderCompassArchive();
});
