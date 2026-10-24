// 출처: 경기진학지도협의회 대학 정보 나침반 (https://specialzoker.github.io/namdimban.html)
const HOME_RAW = {
  "서울": [["건국대학교","https://enter.konkuk.ac.kr/main.do","사립"],["경희대학교","https://iphak.khu.ac.kr","사립"],["고려대학교","https://oku.korea.ac.kr","사립"],["광운대학교","https://iphak.kw.ac.kr/main.php","사립"],["국민대학교","https://admission.kookmin.ac.kr","사립"],["덕성여자대학교","https://www.duksung.ac.kr/iphak/main.do","사립"],["동국대학교","https://ipsi.dongguk.edu","사립"],["동덕여자대학교","https://ipsi.dongduk.ac.kr","사립"],["명지대학교","https://iphak.mju.ac.kr","사립"],["삼육대학교","https://ipsi.syu.ac.kr","사립"],["상명대학교","https://admission.smu.ac.kr","사립"],["서강대학교","https://admission.sogang.ac.kr/enter/html/main/index.asp","사립"],["서경대학교","https://go.skuniv.ac.kr","사립"],["서울과학기술대학교","https://admission.seoultech.ac.kr","국립"],["서울대학교","https://admission.snu.ac.kr","국립"],["서울시립대학교","https://admission.uos.ac.kr","공립"],["서울여자대학교","https://admission.swu.ac.kr","사립"],["성균관대학교","https://admission.skku.edu","사립"],["성신여자대학교","https://admission.sungshin.ac.kr","사립"],["세종대학교","https://ipsi.sejong.ac.kr","사립"],["숙명여자대학교","https://admission.sookmyung.ac.kr/admission/html/main/main.asp","사립"],["숭실대학교","https://iphak.ssu.ac.kr","사립"],["연세대학교","https://admission.yonsei.ac.kr","사립"],["이화여자대학교","https://admission.ewha.ac.kr","사립"],["중앙대학교","https://admission.cau.ac.kr/main.do","사립"],["추계예술대학교","https://enter.chugye.ac.kr/main.do","사립"],["한국외국어대학교","https://adms.hufs.ac.kr/index.do","사립"],["한국체육대학교","https://www.knsu.ac.kr/ipsi/index.do","국립"],["한성대학교","https://enter.hansung.ac.kr","사립"],["한양대학교","https://go.hanyang.ac.kr/gate.do","사립"],["홍익대학교","https://admission.hongik.ac.kr/main","사립"],["강서대","https://entrance.gangseo.ac.kr/kcui/mainService","사립"],["성공회대","https://enter.skhu.ac.kr/enter/index.do","사립"],["장로회신학대","https://www.puts.ac.kr/ipsi/db/db_admission_v1/","사립"],["총신대","https://admission.csu.ac.kr/","사립"],["한국성서대","https://ipsi.bible.ac.kr/","사립"]],
  "경기": [["경동대(양주)","https://www.kduniv.ac.kr/iphak/Main.do","사립"],["가천대학교","https://admission.gachon.ac.kr","사립"],["가톨릭대학교","https://ipsi.catholic.ac.kr","사립"],["강남대학교","https://admission.kangnam.ac.kr/main.htm","사립"],["경기대학교","https://enter.kyonggi.ac.kr/index.do","사립"],["단국대학교","https://ipsi.dankook.ac.kr/intro.html","사립"],["대진대학교","https://admission.daejin.ac.kr/main.do","사립"],["성결대학교","https://ipsi.sungkyul.ac.kr","사립"],["수원대학교","https://ipsi.suwon.ac.kr/","사립"],["아주대학교","https://www.iajou.ac.kr","사립"],["안양대학교","https://enter.anyang.ac.kr/main","사립"],["용인대학교","https://ipsi.yongin.ac.kr/index.do","사립"],["을지대학교","https://admission.eulji.ac.kr/","사립"],["차의과학대학교","https://admission.cha.ac.kr","사립"],["평택대학교","https://entrance.ptu.ac.kr","사립"],["한국항공대학교","https://ibhak.kau.ac.kr","사립"],["한세대학교","https://ipsi.hansei.ac.kr/sites/ipsi/index.do","사립"],["한신대학교","https://ent.hs.ac.kr","사립"],["한양대학교(ERICA)","https://goerica.hanyang.ac.kr/admission/html/main/main.asp","사립"],["협성대학교","https://iphak.uhs.ac.kr/jungsi/mojip.do","사립"],["경인교대","https://ipsi.ginue.ac.kr/ipsi/Main.do","국립"],["루터대","http://ltu-admission.ac.kr/index_.html","사립"],["신한대","https://ipsi.shinhan.ac.kr/","사립"],["칼빈대","http://www.calvin.ac.kr/iphak/index.do","사립"],["한경국립대","https://ipsi.hknu.ac.kr/","국립"],["한국공학대","https://iphak.tukorea.ac.kr/main.htm","사립"],["화성의과학대","https://www.hsmu.ac.kr/admission/main/index.do","사립"]],
  "인천": [["인천대학교","https://admission.inu.ac.kr/main.do","공립"],["인하대학교","https://admission.inha.ac.kr","사립"]],
  "강원": [["가톨릭관동대학교","https://www.cku.ac.kr/iphak/index.do","사립"],["강원대(강릉)","https://iphak.gwnu.ac.kr/sites/iphak/index.do","국립"],["강원대(춘천)","https://admission.kangwon.ac.kr","국립"],["상지대학교","https://www.sangji.ac.kr/go/index.do","사립"],["연세대학교(미래)","https://mirae.yonsei.ac.kr/wj/2349/subview.do","사립"],["한림대학교","https://admission.hallym.ac.kr/admission/index.do","사립"],["춘천교대","https://www.cnue.ac.kr/enter/index.do","국립"]],
  "대전": [["KAIST","https://admission.kaist.ac.kr","국립"],["충남대학교","https://ipsi.cnu.ac.kr","국립"],["목원대학교","https://enter.mokwon.ac.kr","사립"],["배재대학교","https://enter.pcu.ac.kr","사립"],["우송대학교","https://ent.wsu.ac.kr","사립"],["한남대학교","https://ibsi.hannam.ac.kr","사립"],["한밭대학교","https://www.hanbat.ac.kr/admission/","국립"],["대전신학대","https://ipsi.daejeon.ac.kr/","사립"],["한국침례신학대학교","https://ipsi.kbtus.ac.kr/ipsi/Main.do","사립"]],
  "충북": [["서원대학교","https://www.seowon.ac.kr/iphak/index.do","사립"],["청주대학교","https://www.cju.ac.kr/ipsi/index.do","사립"],["충북대학교","https://ipsi.chungbuk.ac.kr","국립"],["한국교원대","https://www.knue.ac.kr/ipsi/index.do","국립"],["건국대 글로컬","https://ibsi.konkuk.ac.kr","사립"]],
  "충남": [["건양대학교","https://ipsi.konyang.ac.kr","사립"],["공주대학교","https://ipsi.kongju.ac.kr","국립"],["나사렛대학교","https://ipsi.kornu.ac.kr/sites/ipsi/index.do","사립"],["남서울대학교","https://consult.mncapro.co.kr/solution/nsuipsi","사립"],["백석대학교","https://ipsi.bu.ac.kr","사립"],["순천향대학교","https://ipsi.sch.ac.kr","사립"],["한국기술교육대학교","https://www.koreatech.ac.kr/index.es?sid=a4","국립"],["호서대학교","https://ipsi.hoseo.ac.kr","사립"],["상명대(천안)","https://admission.smu.ac.kr","사립"]],
  "대구": [["DGIST","https://admission.dgist.ac.kr","국립"],["경북대학교","https://ipsi1.knu.ac.kr","국립"],["대구교대","https://ipsi.dnue.ac.kr","국립"]],
  "경북": [["POSTECH","https://adm-u.postech.ac.kr/","사립"],["대구대학교","https://ipsi.daegu.ac.kr","사립"],["계명대학교","https://www.gokmu.ac.kr","사립"],["국립경국대","https://www.gknu.ac.kr/main/html.do?menu_idx=2","국립"],["금오공과대학교","https://www.kumoh.ac.kr/ipsi/index.do","국립"],["대구가톨릭대학교","https://ibsi.cu.ac.kr","사립"],["영남대학교","https://enter.yu.ac.kr","사립"]],
  "부산": [["경성대학교","https://ipsi.ks.ac.kr","사립"],["동서대학교","https://ipsi.dongseo.ac.kr","사립"],["신라대학교","https://ipsi.silla.ac.kr","사립"],["한국해양대학교","https://www.kmou.ac.kr/ipsi/","국립"],["고신대학교","https://dream.kosin.ac.kr","사립"],["동아대학교","https://ent.donga.ac.kr","사립"],["동의대학교","https://www.deu.ac.kr/Admissions/index.htm","사립"],["부경대학교","https://iphak.pknu.ac.kr","국립"],["부산대학교","https://go.pusan.ac.kr","국립"],["부산외국어대학교","https://enter.bufs.ac.kr","사립"],["부산교대","https://www.bnue.ac.kr/ipsi","국립"]],
  "경남": [["가야대학교","https://ipsi.kaya.ac.kr","사립"],["경남대학교","https://ipsi.kyungnam.ac.kr","사립"],["경상국립대학교","https://www.gnu.ac.kr/new/main.do","국립"],["영산대학교","https://www.ysu.ac.kr/ysu/1010/subview.do","사립"],["인제대학교","https://iphak.inje.ac.kr","사립"],["국립창원대학교","https://www.changwon.ac.kr/ipsi/main.do","국립"],["한동대학교","https://www.handong.edu/kor/admission","사립"],["진주교대","https://www.cue.ac.kr/enter/Main.do","국립"]],
  "울산": [["UNIST","https://adm-u.unist.ac.kr/admission/index.do","국립"],["울산대학교","https://iphak.ulsan.ac.kr","사립"]],
  "광주": [["GIST","https://admission.gist.ac.kr","국립"],["전남대학교","https://admission.jnu.ac.kr","국립"],["광주대학교","https://iphak.gwangju.ac.kr","사립"],["광주여자대학교","https://ipsi.kwu.ac.kr","사립"],["조선대학교","https://i.chosun.ac.kr/intro","사립"],["호남대학교","https://enter.honam.ac.kr","사립"]],
  "전북": [["우석대학교","https://enter.woosuk.ac.kr","사립"],["원광대학교","https://ipsi.wku.ac.kr","사립"],["전북대학교","https://enter.jbnu.ac.kr","국립"],["전주대학교","https://iphak.jj.ac.kr","사립"],["예원예술대","https://admission.yewon.ac.kr/main/","사립"]],
  "전남": [["동신대학교","https://www.dsu.ac.kr/dsu/1001/subview.do","사립"],["목포대학교","https://ipsi.mokpo.ac.kr","국립"],["세한대학교","https://www.sehan.ac.kr/sehan/1004/subview.do","사립"],["순천대학교","https://www.scnu.ac.kr/iphak/main.do","국립"]],
  "제주": [["제주국제대학교","https://apply.jeju.ac.kr","사립"],["제주대학교","https://ibsi.jejunu.ac.kr","국립"]]
};
// 나침반 데이터: [{name, region, url},
const RECRUIT_RAW = [
{"name":"UNIST","region":"울산","url":"https://drive.google.com/file/d/1yLRPFcjyfMG9YGh7_kG81WlsA26XNsu4/view?usp=drivesdk"},
{"name":"전북대학교","region":"전북","url":"https://drive.google.com/file/d/1r7T_1OFvknNzDvzJu3Jw19EFTMyPBxXp/view?usp=drivesdk"},
{"name":"부산외국어대학교","region":"부산","url":"https://drive.google.com/file/d/14TOBUvYehoISEjL2mXw0f1zVdBVmhxvR/view?usp=drivesdk"},
{"name":"KAIST","region":"대전","url":"https://drive.google.com/file/d/1D5-T-pbVUUGP_LYY4A9vsD01q5QSr03_/view?usp=drivesdk"},
{"name":"GIST","region":"광주","url":"https://drive.google.com/file/d/1ftA9h_ypq90qXiHwc2mW9RiKhBYK7x4Q/view?usp=drivesdk"},
{"name":"POSTECH","region":"경북","url":"https://drive.google.com/file/d/1JTZ5v5NrR4agyhjNAprNqchHkQumEyXN/view?usp=drivesdk"},
{"name":"대구가톨릭대학교","region":"경북","url":"https://drive.google.com/file/d/1HE01zuNgbOD1Zj0617D-aeXU2JIkPWMA/view?usp=drivesdk"},
{"name":"국립경국대","region":"경북","url":"https://drive.google.com/file/d/17F--NN_p5lM2WgXVDbDubf45RN4e55tO/view?usp=drivesdk"},
{"name":"경상국립대학교","region":"경남","url":"https://drive.google.com/file/d/12aUihWf4fY-sjX3Zai2CfMDTsnpiFuzC/view?usp=drivesdk"},
{"name":"경남대학교","region":"경남","url":"https://drive.google.com/file/d/1T7vC8Ca11QwzrEI4eDQPeisHXn5Qsh2Y/view?usp=drivesdk"},
{"name":"가야대학교","region":"경남","url":"https://drive.google.com/file/d/1-3XGB6LMwsBckgLCff1pvyaS_UqjbIcm/view?usp=drivesdk"},
{"name":"가톨릭관동대학교","region":"강원","url":"https://drive.google.com/file/d/12VM-7pKXQbusChFbwTx0nevEbvbslpBH/view?usp=drivesdk"},
{"name":"한양대학교(ERICA)","region":"경기","url":"https://drive.google.com/file/d/18PeNPkUN-jwagKosmAnVux5-8KnIPT3k/view?usp=drivesdk"},
{"name":"단국대학교","region":"경기","url":"https://drive.google.com/file/d/1KNiEzngXNJMVa11h7Q5goYmlaVeM2Bcf/view?usp=drivesdk"},
{"name":"가천대학교","region":"경기","url":"https://drive.google.com/file/d/1IuXFZsfEO5YNSqMyHau9WfWELNNJ17CS/view?usp=drivesdk"},
{"name":"한국체육대학교","region":"서울","url":"https://drive.google.com/file/d/1IhzL_bBih-M60UyavlHqNseVdtyZgnXV/view?usp=drivesdk"},
{"name":"연세대학교","region":"서울","url":"https://drive.google.com/file/d/1AouyHezTDrhzm8PXT_2XePyOodNOkhBM/view?usp=drive_link"},
{"name":"숭실대학교","region":"서울","url":"https://drive.google.com/file/d/1qO1uvTOto_T-S85Jn8lgLsKtXo5pjKUQ/view?usp=drivesdk"},
{"name":"진주교대","region":"경남","url":"https://drive.google.com/file/d/14v6KB1Btfyhf8umJZlsyTlQ7DCGmrePo/view?usp=drivesdk"},
{"name":"제주대학교","region":"제주","url":"https://drive.google.com/file/d/1k_jfE7PxucybAjaXm7rkchrO4pyifhMq/view?usp=drivesdk"},
{"name":"광주대학교","region":"광주","url":"https://drive.google.com/file/d/1Gt3NnWKEjz3GENRldc9ZKoypFiLbSIqJ/view?usp=drivesdk"},
{"name":"고신대학교","region":"부산","url":"https://drive.google.com/file/d/1sc6MXPC-BSmpaXzFl0_PwpJK0BYL7H41/view?usp=drivesdk"},
{"name":"충북대학교","region":"충북","url":"https://drive.google.com/file/d/1RLsLwc_wXBnEv4pqljp-p8nSeXRc6oEI/view?usp=drivesdk"},
{"name":"배재대학교","region":"대전","url":"https://drive.google.com/file/d/133u_uXAMuyTR-7T4_LjIT5JHS56GDjki/view?usp=drivesdk"},
{"name":"화성의과학대","region":"경기","url":"https://drive.google.com/file/d/1Ims4f0HCKjV70tueHLrLOvIb6_IvzTrK/view?usp=drivesdk"},
{"name":"한국공학대","region":"경기","url":"https://drive.google.com/file/d/1VnnrIcALpSHE3p0EH5mC-t3TCsojVjAs/view?usp=drivesdk"},
{"name":"평택대학교","region":"경기","url":"https://drive.google.com/file/d/1RhSgkIBRK6UR9fWC5IKtf2HXSkl4EnMJ/view?usp=drivesdk"},
{"name":"안양대학교","region":"경기","url":"https://drive.google.com/file/d/1gudXmEFQMIsUsKWDTTwKZrYvLBh4hxSF/view?usp=drivesdk"},
{"name":"한국외국어대학교","region":"서울","url":"https://drive.google.com/file/d/1yCBERDGVz97st7GV8duSk0ONCSrSo-tq/view?usp=drivesdk"},
{"name":"상명대(천안)","region":"충남","url":"https://drive.google.com/file/d/17K6bd97wwDkVnm9SiVhnIbT_do0V7JEs/view?usp=drivesdk"},
{"name":"상명대학교","region":"서울","url":"https://drive.google.com/file/d/14IU2_74qg90xV4JNwYZcoLKqb9tbakNI/view?usp=drivesdk"},
{"name":"명지대학교","region":"서울","url":"https://drive.google.com/file/d/1N-k_pBCdh_TVqB2OTCrTaxGrKVf70LYv/view?usp=drivesdk"},
{"name":"중앙대학교","region":"서울","url":"https://drive.google.com/file/d/1oRCq3heghRe2jd7za3sHmhfjbhyKXwYj/view?usp=drivesdk"},
{"name":"한양대학교","region":"서울","url":"https://drive.google.com/file/d/1Gko56lDRJPUN2M77rITEN3QChtZraBuR/view?usp=drivesdk"},
{"name":"계명대학교","region":"경북","url":"https://drive.google.com/file/d/1lbbl2uP3GhYesM8CjZ479oYrv4dMncgb/view?usp=drivesdk"},
{"name":"성균관대학교","region":"서울","url":"https://drive.google.com/file/d/1OyO_m2xLUlKF78A_MwDzb9a1nCE5gfoF/view?usp=drivesdk"},
{"name":"한국기술교육대학교","region":"충남","url":"https://drive.google.com/file/d/15IF6nBdMBUUK04jbCpJ8h4kQhnDAGbIR/view?usp=drivesdk"},
{"name":"한국교원대","region":"충북","url":"https://drive.google.com/file/d/1WMm4C5YG17qa2Pwt65bSZeNE6mlAtK-Z/view?usp=drivesdk"},
{"name":"춘천교대","region":"강원","url":"https://drive.google.com/file/d/1ntH_JJ0uexjDSSg4a46Cz3gP88lDyoav/view?usp=drivesdk"},
{"name":"한동대학교","region":"경남","url":"https://drive.google.com/file/d/1ZzAjvenbGhapMChDBz3BBTGSbn_aw-bw/view?usp=drivesdk"},
{"name":"대구대학교","region":"경북","url":"https://drive.google.com/file/d/1kXVkRtho6Di9SUhhNjDsvLML7NrV_hKP/view?usp=drivesdk"},
{"name":"총신대","region":"서울","url":"https://drive.google.com/file/d/1HSWoeO_mmQsel8gs3Fw74cA4z2SP_fzv/view?usp=drivesdk"},
{"name":"한신대학교","region":"경기","url":"https://drive.google.com/file/d/134QP57uggcCSlVBdLuG1zqllVnglffnK/view?usp=drivesdk"},
{"name":"한밭대학교","region":"대전","url":"https://drive.google.com/file/d/1SPwrE9f6kjyiU7GRgG3lBXT6HnxrzuRA/view?usp=drivesdk"},
{"name":"백석대학교","region":"충남","url":"https://drive.google.com/file/d/1e8VVbbsmdqrJ-ZfZBeAiQFdWezWhjLuS/view?usp=drivesdk"},
{"name":"홍익대학교","region":"서울","url":"https://drive.google.com/file/d/1U-ursu-DGLQp7ezpX90lJ5-lw_68TihO/view?usp=drivesdk"},
{"name":"수원대학교","region":"경기","url":"https://drive.google.com/file/d/1jlbLyU5mOOD_zssumOyQnVmEu_awinFM/view?usp=drivesdk"},
{"name":"삼육대학교","region":"서울","url":"https://drive.google.com/file/d/1Vdqwm_DznDMnwd7kWqq6TJvuzaYeHcIs/view?usp=drivesdk"},
{"name":"성결대학교","region":"경기","url":"https://drive.google.com/file/d/18KWfiobD2CzHC-vTr9J4IuMYwx1gZWg5/view?usp=drivesdk"},
{"name":"전주대학교","region":"전북","url":"https://drive.google.com/file/d/1gshpO83wHmLz7McRT-gIEPGbWP-72cDs/view?usp=drivesdk"},
{"name":"원광대학교","region":"전북","url":"https://drive.google.com/file/d/1RCUVo1A7VH3hX8kUgHir1kcpNlwaONcU/view?usp=drivesdk"},
{"name":"한남대학교","region":"대전","url":"https://drive.google.com/file/d/1DqFAVi5Dlryhb_XzW6EkLGnsyD_hYs6C/view?usp=drivesdk"},
{"name":"우송대학교","region":"대전","url":"https://drive.google.com/file/d/11RVKBxr1mqOk6rdiqSPoRcjwhiDQv1Dc/view?usp=drivesdk"},
{"name":"한림대학교","region":"강원","url":"https://drive.google.com/file/d/1jlqzg7HiDvhH0hyMsIMFf6WUiChEGUbo/view?usp=drivesdk"},
{"name":"상지대학교","region":"강원","url":"https://drive.google.com/file/d/1RSehoKrx33jZ5cZb3lCdnZaDX65ZeKXk/view?usp=drivesdk"},
{"name":"한국침례신학대학교","region":"대전","url":"https://drive.google.com/file/d/13HRTwYJ6uH2wxHp-SFCViDGm_2lW5odF/view?usp=drivesdk"},
{"name":"한국성서대","region":"서울","url":"https://drive.google.com/file/d/1T2Y48xrRRBaL5k_69JtTv7orifQCPDyR/view?usp=drivesdk"},
{"name":"칼빈대","region":"경기","url":"https://drive.google.com/file/d/1VvuL_GwzBijLTsR87MICm349wRWrQlof/view?usp=drivesdk"},
{"name":"장로회신학대","region":"서울","url":"https://drive.google.com/file/d/1prnd0zjwg0CX69Aor-_U4MqEcSgkbwTh/view?usp=drivesdk"},
{"name":"영산대학교","region":"경남","url":"https://drive.google.com/file/d/1DtEXsX6tVsJsVkTOpxZiLU2uDWMYyMbw/view?usp=drivesdk"},
{"name":"영남대학교","region":"경북","url":"https://drive.google.com/file/d/1xq-V8JTzPmzJHj38BAJDTq9YwnENFPFW/view?usp=drivesdk"},
{"name":"우석대학교","region":"전북","url":"https://drive.google.com/file/d/1SKJEdU3mviQH3GcoCeRS35YhV56_g9kL/view?usp=drivesdk"},
{"name":"예원예술대","region":"전북","url":"https://drive.google.com/file/d/16mJ41_AVjtgD-jjOmXYCv3RCsbBnYNmj/view?usp=drivesdk"},
{"name":"연세대학교","region":"강원","url":"https://drive.google.com/file/d/1VfN77WgBugtIo2GzdEI_JlF-y7mcxWK8/view?usp=drivesdk"},
{"name":"건양대학교","region":"충남","url":"https://drive.google.com/file/d/1AILhLRGEHXrCjy_v1th5LqNX3Z5DfAMV/view?usp=drivesdk"},
{"name":"한국해양대학교","region":"부산","url":"https://drive.google.com/file/d/1LYkijjm09kx49tzxGVmOcvZYtWyXBMdI/view?usp=drivesdk"},
{"name":"충남대학교","region":"대전","url":"https://drive.google.com/file/d/1VcbHdzTihgZopP6KuBIaigRqYz2gFqGG/view?usp=drivesdk"},
{"name":"공주대학교","region":"충남","url":"https://drive.google.com/file/d/1hP2IpH7lCOevl9GHplwPWJGm_4u5XOVU/view?usp=drivesdk"},
{"name":"인하대학교","region":"인천","url":"https://drive.google.com/file/d/1_HnceOkapSchB_iULoV_v7qOa6CmEE8x/view?usp=drivesdk"},
{"name":"아주대학교","region":"경기","url":"https://drive.google.com/file/d/1NNs1ahHG0-kKgdjgJGEfHD2M_-QvCQBQ/view?usp=drivesdk"},
{"name":"신한대","region":"경기","url":"https://drive.google.com/file/d/1XgOLamx4awNEhFAOGL2V5WY19CNZYj0S/view?usp=drivesdk"},
{"name":"대진대학교","region":"경기","url":"https://drive.google.com/file/d/1Dvq2dnntnzqfv8AYBTxJxUyvpP8ty-0s/view?usp=drivesdk"},
{"name":"경기대학교","region":"경기","url":"https://drive.google.com/file/d/1wwNzdWG1szCuVJEd5DgATG6-v6G7pE-h/view?usp=drivesdk"},
{"name":"성공회대","region":"서울","url":"https://drive.google.com/file/d/1AbgQSCoXFfflRVtUpfag1x8DODFU4IuD/view?usp=drivesdk"},
{"name":"국민대학교","region":"서울","url":"https://drive.google.com/file/d/1RjEzTSX2DRhGup-vDYYoydD_qaEQav_D/view?usp=drivesdk"},
{"name":"건국대 글로컬","region":"충북","url":"https://drive.google.com/file/d/1__QeGGtNgmjyvTW4NSTXzsgknat_xFxa/view?usp=drivesdk"},
{"name":"남서울대학교","region":"충남","url":"https://drive.google.com/file/d/1OqT6cFse2FS7JZstIhcKKBjhoDu8S5oP/view?usp=drivesdk"},
{"name":"목원대학교","region":"대전","url":"https://drive.google.com/file/d/1ptLwQuPG3IAwX0L2RS4qu9nNnfnM58p9/view?usp=drivesdk"},
{"name":"서원대학교","region":"충북","url":"https://drive.google.com/file/d/1iVwwM7vl7IhuOI5Vx4ougLxMBIyPQLcn/view?usp=drivesdk"},
{"name":"순천향대학교","region":"충남","url":"https://drive.google.com/file/d/11_ePJ_1ywuYR_av9qM7rmgNny904oP2a/view?usp=drivesdk"},
{"name":"호서대학교","region":"충남","url":"https://drive.google.com/file/d/1-L4b3HPjthjGZ6TuEcVxPCcb6AukWczB/view?usp=drivesdk"},
{"name":"부산교대","region":"부산","url":"https://drive.google.com/file/d/1XyaPttzyGLe8-qZ7ravjPtQwwjdOA6CC/view?usp=drivesdk"},
{"name":"순천대학교","region":"전남","url":"https://drive.google.com/file/d/149KNyqqNnEbTvYLuZFsL_h7hAKMaE5bt/view?usp=drivesdk"},
{"name":"인천대학교","region":"인천","url":"https://drive.google.com/file/d/1NlRbot3cOowMdAMxz2Po36MAmJYNZI6T/view?usp=drivesdk"},
{"name":"신라대학교","region":"부산","url":"https://drive.google.com/file/d/1axJNhAIhe1PxdIcun46cuqlZm8xS4gBW/view?usp=drivesdk"},
{"name":"건국대학교","region":"서울","url":"https://drive.google.com/file/d/1k-4L3aYDBJUm8Ts8obsV3jmKuqHuvxbZ/view?usp=drivesdk"},
{"name":"전남대학교","region":"광주","url":"https://drive.google.com/file/d/1gBA8DCFgSTO9cTBMKvJ_b9QLrn9qMZaR/view?usp=drivesdk"},
{"name":"대구교대","region":"대구","url":"https://drive.google.com/file/d/1ikv-IeagEkgN6fzcUY3Yas2BYkigcZYi/view?usp=drivesdk"},
{"name":"경희대학교","region":"서울","url":"https://drive.google.com/file/d/1WUvNpkUxufqJYDs0lmGCGnw9r72ZxD7H/view?usp=drivesdk"},
{"name":"제주국제대학교","region":"제주","url":"https://drive.google.com/file/d/1QELg56iAFLQIRI-TDwAqgUz2q7k7GYe3/view?usp=drivesdk"},
{"name":"호남대학교","region":"광주","url":"https://drive.google.com/file/d/1v3YfcYDYKYL9mky8Rr-P6KlZekEUSLKC/view?usp=drivesdk"},
{"name":"경성대학교","region":"부산","url":"https://drive.google.com/file/d/1ouiOY0kVrF3OTx0-F2c2o9qlXrksOrzV/view?usp=drivesdk"},
{"name":"동서대학교","region":"부산","url":"https://drive.google.com/file/d/1qxymhNarUYUlq0YGjUs1lKrCxlkPmmbN/view?usp=drivesdk"},
{"name":"동아대학교","region":"부산","url":"https://drive.google.com/file/d/1UQ-PM7CzIJheUxukbcyZtHxX0P01zk6L/view?usp=drivesdk"},
{"name":"동의대학교","region":"부산","url":"https://drive.google.com/file/d/1jw1BN4Qo67Q_TKUQzi1rxOaikrrLIAiO/view?usp=drivesdk"},
{"name":"울산대학교","region":"울산","url":"https://drive.google.com/file/d/12c6VV8vTy2Qn_jznFphlizOW4oV9qAQl/view?usp=drivesdk"},
{"name":"인제대학교","region":"경남","url":"https://drive.google.com/file/d/1Pox6jVvWaZftcWqQ0IRyjVkQvJ5b7q9D/view?usp=drivesdk"},
{"name":"경인교대","region":"경기","url":"https://drive.google.com/file/d/1xLUwpNM9V6nsGqSUklpScviq4n4ciYLF/view?usp=drivesdk"},
{"name":"한경국립대","region":"경기","url":"https://drive.google.com/file/d/1LL_WfIIYkPEMyluxx-5koOnAtmEJf9L1/view?usp=drivesdk"},
{"name":"부산대학교","region":"부산","url":"https://drive.google.com/file/d/1izwpxkGtGLUWwoEVt2J-7R2UN69a-xuR/view?usp=drivesdk"},
{"name":"부경대학교","region":"부산","url":"https://drive.google.com/file/d/1B0mMOMSZFeFjlxAqUuofKyNNQW2WESP7/view?usp=drivesdk"},
{"name":"금오공과대학교","region":"경북","url":"https://drive.google.com/file/d/1fUg0caHHcjr19bwMxOgaklRmCIIzwuGs/view?usp=drivesdk"},
{"name":"경북대학교","region":"대구","url":"https://drive.google.com/file/d/1T2yASp451z0zwBVlLYSlsYHJ5UQgqov0/view?usp=drivesdk"},
{"name":"강원대(강릉)","region":"강원","url":"https://drive.google.com/file/d/1y7lmUhaZ0bqhxwo9czyDc2wxc_Hj3gWB/view?usp=drivesdk"},
{"name":"강원대(춘천)","region":"강원","url":"https://drive.google.com/file/d/1L1PAfca1sAJ4LmeTrKEdPvVPBTRvu1t5/view?usp=drivesdk"},
{"name":"협성대학교","region":"경기","url":"https://drive.google.com/file/d/1GaZBTDtZFSaeSdMOibyCtVI9ZrYASP-d/view?usp=drivesdk"},
{"name":"한세대학교","region":"경기","url":"https://drive.google.com/file/d/1waAQ1sl2r9PjSKGaQu8Sg_-USOriKgA9/view?usp=drivesdk"},
{"name":"한국항공대학교","region":"경기","url":"https://drive.google.com/file/d/1BvYuYffjZPw-PSTZTsJBaT9nP-KWqk4O/view?usp=drivesdk"},
{"name":"용인대학교","region":"경기","url":"https://drive.google.com/file/d/1zSt14RybGdeOrOfUoIzGvQyVsmHqQnUg/view?usp=drivesdk"},
{"name":"강남대학교","region":"경기","url":"https://drive.google.com/file/d/1CAZGWG0ywgbP7r9NJ8ozofwSi_EvzMcy/view?usp=drivesdk"},
{"name":"한성대학교","region":"서울","url":"https://drive.google.com/file/d/1cnz1CdcPIewCjwIhpEfrJD-i0vpNKYI1/view?usp=drivesdk"},
{"name":"추계예술대학교","region":"서울","url":"https://drive.google.com/file/d/1YYzbjhGLhSuXXEh3c9tRuL1gI_iayqtE/view?usp=drivesdk"},
{"name":"이화여자대학교","region":"서울","url":"https://drive.google.com/file/d/1xlt_aeGITKpmeUy3ndwprivmmx-sfa1c/view?usp=drivesdk"},
{"name":"숙명여자대학교","region":"서울","url":"https://drive.google.com/file/d/1hTJKNJQCxUsxch6MU8kKO1vGHELJoJHG/view?usp=drivesdk"},
{"name":"세종대학교","region":"서울","url":"https://drive.google.com/file/d/1_aDt9xvNFcry5ORofa7QGd4G5JBadK_c/view?usp=drivesdk"},
{"name":"성신여자대학교","region":"서울","url":"https://drive.google.com/file/d/1rYv_UpZvwh0WVj35h8HytTRP15QbUmTX/view?usp=drivesdk"},
{"name":"서울시립대학교","region":"서울","url":"https://drive.google.com/file/d/1tP3QiGtqcINNLKl8l4t_HsZH5HXoSJlw/view?usp=drivesdk"},
{"name":"서울대학교","region":"서울","url":"https://drive.google.com/file/d/1K2nUz7e9VDHDugVyeID4Sk634XK1pCNH/view?usp=drive_link"},
{"name":"서울과학기술대학교","region":"서울","url":"https://drive.google.com/file/d/1EKrrG97KXwu_pPH4_FUsvvDDjZVHB4aH/view?usp=drivesdk"},
{"name":"동덕여자대학교","region":"서울","url":"https://drive.google.com/file/d/1waCpSHpvREvRrUzpzrfpdDXIgcFdfziW/view?usp=drivesdk"},
{"name":"동국대학교","region":"서울","url":"https://drive.google.com/file/d/1dhCNmyomKPPpwwqFyOIVZUPqjOyv-gFQ/view?usp=drivesdk"},
{"name":"덕성여자대학교","region":"서울","url":"https://drive.google.com/file/d/1-UV8IOSLx2T5_HgGzgD46tHiHDSIe4-O/view?usp=drivesdk"},
{"name":"광운대학교","region":"서울","url":"https://drive.google.com/file/d/1PpkUPSxjisCbRKkJtQjmuCwC4N8YLKer/view?usp=drivesdk"},
{"name":"고려대학교","region":"서울","url":"https://drive.google.com/file/d/1FZVTv1GsyioF1zeTsUrgWrclSEMO6Xib/view?usp=drivesdk"},
{"name":"강서대","region":"서울","url":"https://drive.google.com/file/d/19XEH8F8Mwj9gbPc5aoFgp4k0__L9R6W8/view?usp=drivesdk"},
{"name":"가톨릭대학교","region":"경기","url":"https://drive.google.com/file/d/1QOO_sGC1m0_lPm5ed8veAmPE51zuyYTP/view?usp=drivesdk"},
{"name":"차의과학대학교","region":"경기","url":"https://drive.google.com/file/d/16iOtzBDO5OfF0_fcLkhCpt5c0qakPtsh/view?usp=drivesdk"},
{"name":"나사렛대학교","region":"충남","url":"https://drive.google.com/file/d/1NYBLQdDYQfSi8I4fZ3VDme52UcRVv7ML/view?usp=drivesdk"},
{"name":"서울여자대학교","region":"서울","url":"https://drive.google.com/file/d/1xAfe0eh-KaosUKjMBq-pMSoL8ro4Kk_R/view?usp=drive_link"},
{"name":"서강대학교","region":"서울","url":"https://drive.google.com/file/d/1x0ezys1LdheMQ0ED2iqH7Y65deSmkc-F/view?usp=drive_link"},
{"name":"국립창원대학교","region":"경남","url":"https://drive.google.com/file/d/14w24ekmPTD10Xr-BaGEwOeMKKBQHzzIu/view?usp=drive_link"},
{"name":"경동대(양주)","region":"경기","url":"https://drive.google.com/file/d/1raD5cH99w8jjLfVZG1KMGxlEQrddQJo_/view?usp=drive_link"}
];

const PDF_RAW = [{"name":"가천대","region":"경기","url":"https://drive.google.com/open?id=1e6JayrALWW2Smzli4M8zd7Pq7dpx2g5C"},{"name":"가톨릭대","region":"서울","url":"https://drive.google.com/open?id=1-vdDECCcglZ2ZRT2gTzwbjC1ILCdjgGp"},{"name":"강남대","region":"경기","url":"https://drive.google.com/open?id=1FOt26aL1JtY4xXWzokEHELYLWGzlv8lB"},{"name":"강서대","region":"서울","url":"https://drive.google.com/open?id=1jOKHlrbPRvw_hCPlLgL575Q8EE8Gw-0p"},{"name":"강원대(춘천)","region":"강원","url":"https://drive.google.com/file/d/1NgwACUYKPyIlZ6ggoYLnLdaZQEjC7zUi/view?usp=drive_link"},{"name":"건국대 글로컬","region":"충북","url":"https://drive.google.com/open?id=18FRqr5DgVWFCU03zI1yGkTdrDGIvAc44"},{"name":"건국대","region":"서울","url":"https://drive.google.com/open?id=1oiV1aENYl0xBznkpPrDST5EpXzlEGisK"},{"name":"경기대","region":"경기","url":"https://drive.google.com/open?id=1vgVGzs9jKDLfDap8J5gn76ci3N1ObU5W"},{"name":"경상국립대","region":"경남","url":"https://drive.google.com/open?id=1xAL4pPBtSnWjoXC6y9i-V2YdjUjJ1438"},{"name":"경희대","region":"서울","url":"https://drive.google.com/open?id=1gGE2Ua8wI9kDTrPPsJ22ZnQIApHR760t"},{"name":"고려대","region":"서울","url":"https://drive.google.com/open?id=1d007JpZi2EMpe2AKIGOfWXwMMQfbZ6Jl"},{"name":"광운대","region":"서울","url":"https://drive.google.com/open?id=1KSTWnOKI1swNg5q_L41jnDUqkMVk41cm"},{"name":"국민대","region":"서울","url":"https://drive.google.com/open?id=1YB6ePfrXmqB5HMDcoGAtUFhoe-c1lJls"},{"name":"단국대(죽전, 천안 통합)","region":"경기","url":"https://drive.google.com/open?id=1Fe7ccQX5v8aCxC1j46-QkMmaYdFoLctS"},{"name":"대구교대","region":"대구","url":"https://drive.google.com/open?id=1tgoZ9XL3hpL0_L76Kltfk4b09DS9IQ-P"},{"name":"대전신학대","region":"대전","url":"https://drive.google.com/open?id=1Tqxett-vQ7Rm2N19B1BB9Km737WLio8W"},{"name":"대진대","region":"경기","url":"https://drive.google.com/open?id=1O4GiX1f0o2tmHawuTozJsIg7pT4mFD-7"},{"name":"덕성여대","region":"서울","url":"https://drive.google.com/open?id=1FVjCqNzkF5taSwPlNNU8hwXAtCtb2L1m"},{"name":"동국대","region":"서울","url":"https://drive.google.com/open?id=1-8dyqXRbDkWOioKV83jZXtcldQgBSulE"},{"name":"동덕여대","region":"서울","url":"https://drive.google.com/open?id=1ghbUYgrtGQx_oCVgpQd6gXGkvUK3pxNB"},{"name":"루터대","region":"경기","url":"https://drive.google.com/open?id=19YGREAor525E4YhIv7PYLbaUEsp5lzmK"},{"name":"명지대(서울, 용인 통합)","region":"서울","url":"https://drive.google.com/open?id=1pN7aR--I_8xKIkzV8VL9czbQYfH-ED22"},{"name":"목원대","region":"대전","url":"https://drive.google.com/open?id=1zHyi6kmhCgu2g6aP4_-v9nr5SPgvC0zM"},{"name":"배재대","region":"대전","url":"https://drive.google.com/open?id=1omJC_B_uyY1tV0mfPojEOJYoq4Z2mvgO"},{"name":"부산교대","region":"부산","url":"https://drive.google.com/open?id=1UA-BochF7_x3D5ZUDRnrNhtKMD6ZZqPD"},{"name":"삼육대","region":"서울","url":"https://drive.google.com/open?id=1yRUZbsIyycMZy2AU5fTJMn1XsnuxQzEy"},{"name":"상명대","region":"서울","url":"https://drive.google.com/open?id=1jFnVSgAM1NUkFg8JsYB_WfmPI1bsSQYX"},{"name":"상명대(천안)","region":"충남","url":"https://drive.google.com/open?id=1OUBOm5yt-Xj7Dyn0h22BwDAGdMiA9ZUS"},{"name":"상지대","region":"강원","url":"https://drive.google.com/open?id=1txaURMsS-HzAIrRUgGL2VU-oOJ60-CzY"},{"name":"서강대","region":"서울","url":"https://drive.google.com/open?id=1iLtNCPMqk751nXsyD8wgEha0qWPSwuSQ"},{"name":"서경대","region":"서울","url":"https://drive.google.com/open?id=1A5LDPxz8hdZy505JR4oTAvQjHtTOvTv_"},{"name":"서울과학기술대학교","region":"서울","url":"https://drive.google.com/file/d/1WQSoo2iBgHxYjgygr_ARK1DjvMem0YeK/view?usp=drive_link"},{"name":"서울교대","region":"서울","url":"https://drive.google.com/open?id=1vV3L_OAczmQuoOnLAE21hhGbscgpodAG"},{"name":"서울대학교","region":"서울","url":"https://drive.google.com/open?id=1bvEkkRsWvn5PDJvtICZ7xqAV-8dG3cfQ"},{"name":"서울시립대","region":"서울","url":"https://drive.google.com/open?id=1GTFDkV1BxnQZyVw-7SGau1H2cz6dZWw8"},{"name":"서울신학대","region":"경기","url":"https://drive.google.com/open?id=19q5HLzXjuIq5dFpqiGa5-cnDfrURjM6Y"},{"name":"서울여자대학교","region":"서울","url":"https://drive.google.com/file/d/1z2yAG0Z6SkfYZpIwofB0d0V9LNPQ46GE/view?usp=sharing"},{"name":"서울한영대","region":"서울","url":"https://drive.google.com/open?id=1809SOx4mP7v5Ry2ITTYjXxxmN5UPoEfi"},{"name":"성결대","region":"경기","url":"https://drive.google.com/open?id=1beDB3U4T9AwsLGxVYIznqmodrH774Vlo"},{"name":"성공회대","region":"서울","url":"https://drive.google.com/open?id=1f-JaNGwqhoj5wRpVPyPaHz8kR8c8oSXt"},{"name":"성균관대","region":"서울","url":"https://drive.google.com/open?id=1rB-RUieTYBroJ9CQiP3eB2FSS8QOF7hU"},{"name":"성신여대","region":"서울","url":"https://drive.google.com/open?id=1gU0XVoGiHNL4vnCEKI69bSZN_O1b4gHT"},{"name":"세종대","region":"서울","url":"https://drive.google.com/open?id=1YfV_KCxA1ANe3waidwHMvy5NoDWPuWrD"},{"name":"수원대","region":"경기","url":"https://drive.google.com/open?id=1lK08b4Z1yzjJtwceomcod4vby8fTVC5I"},{"name":"숙명여대","region":"서울","url":"https://drive.google.com/open?id=1gK0X4gIRZQc_njXTIw6qPBsz5RUNQU-o"},{"name":"순천향대","region":"충남","url":"https://drive.google.com/open?id=1AT0fpwQmGbb9da5joY5JlnIK1-etNcxB"},{"name":"숭실대","region":"서울","url":"https://drive.google.com/open?id=1X56oSxZ-4RsYAwSnaZueS_duBtx1Yj49"},{"name":"신한대","region":"경기","url":"https://drive.google.com/open?id=11QhBfgTUq2anaRjshshsCd1b1x4ULZ1i"},{"name":"아주대","region":"경기","url":"https://drive.google.com/open?id=10_r1wV8fnH7Cl0ZluaFtfVO4PsD-Tuvj"},{"name":"안양대","region":"경기","url":"https://drive.google.com/open?id=1IgwbLoEFF_0WYs7sJjyoOTo8h4yn32oR"},{"name":"연세대학교","region":"서울","url":"https://drive.google.com/file/d/1AouyHezTDrhzm8PXT_2XePyOodNOkhBM/view?usp=drive_link"},{"name":"연세대학교(미래)","region":"강원","url":"https://drive.google.com/open?id=1K5v8rjwzwnZOTLNAINzhTAnGb8jKuqLr"},{"name":"예원예술대","region":"전북","url":"https://drive.google.com/open?id=1uk6ghzuxp0jM-9G7ewOfrtpEuPU5xHgK"},{"name":"용인대","region":"경기","url":"https://drive.google.com/open?id=1DV760A6rDgvwYrYEZApqj5Yp7HyP9pAL"},{"name":"을지대","region":"경기","url":"https://drive.google.com/open?id=1PFeqKRy1tAoT9S7SZtukA7_ZNFOR8_eR"},{"name":"이화여대","region":"서울","url":"https://drive.google.com/file/d/1VQgE3qjrK39g1ajC8bPfSP4WIPbuimrU/view?usp=sharing"},{"name":"인천대","region":"인천","url":"https://drive.google.com/open?id=1IbGH77ZtJvdmwrnqezwSY8iJqTJFOtRK"},{"name":"인하대","region":"인천","url":"https://drive.google.com/open?id=1krndaYhMEqrtEDO2-NwgwZT6R-CkgXMH"},{"name":"장로회신학대","region":"서울","url":"https://drive.google.com/open?id=1JyMa9nasp4oXTiKVUzIperL7Cap28BuP"},{"name":"전북대","region":"전북","url":"https://drive.google.com/open?id=155SYHT5jF3kAMToms1UECmQcLEFX6qlr"},{"name":"제주대","region":"제주","url":"https://drive.google.com/open?id=1wbYinhGXzxgwGvGvQrBCXvM7ZJ73pF5l"},{"name":"중앙대","region":"서울","url":"https://drive.google.com/open?id=17IHwSINrAaUb8F9WzTkyi2b1r0SK5FzZ"},{"name":"진주교대","region":"경남","url":"https://drive.google.com/open?id=1EQl5WDNeeRFIQWUJ5E2A0h142sVgVB0Q"},{"name":"차의과학대","region":"경기","url":"https://drive.google.com/open?id=1_XIusVqfr9d4-QGzYbj03Wk_4OcJFJjE"},{"name":"청주교대","region":"충북","url":"https://drive.google.com/open?id=1P-ozkErusEhug7KQA-EbzSc0aMwsQpxz"},{"name":"총신대","region":"서울","url":"https://drive.google.com/open?id=1xUP_9fly_RKvjSUvLCYB4kRFkOYNceEb"},{"name":"추계예술대","region":"서울","url":"https://drive.google.com/open?id=1pdZub7FaGgNY_ZVqp8ecBCJP3OwM0A6R"},{"name":"춘천교대","region":"강원","url":"https://drive.google.com/open?id=1LxYTx9owvq54ZxVG6EsVQQkLAP-NJCyJ"},{"name":"충남대","region":"대전","url":"https://drive.google.com/open?id=1HLYQmFQNUzslk_wwA8EciFyDAus6y8cA"},{"name":"충북대","region":"충북","url":"https://drive.google.com/open?id=1j9AIjyMFe_bdmaPlf-3TVSi-meC4ua2F"},{"name":"칼빈대","region":"경기","url":"https://drive.google.com/open?id=1pZIW8ruJhmRDyWe3VeMegIzRdVQT0Lyh"},{"name":"평택대","region":"경기","url":"https://drive.google.com/open?id=1N-cRlvnMVh2jmuTjpyWUOB7LTnWRCfFD"},{"name":"POSTECH","region":"경북","url":"https://drive.google.com/open?id=1kYe5WH2V7uleOFHSx7ME14WqfdhppOO0"},{"name":"한경국립대","region":"경기","url":"https://drive.google.com/open?id=1-Txu4Of_5aMSXl9IfEFxFaNR3OmdUl_V"},{"name":"한국공학대","region":"경기","url":"https://drive.google.com/open?id=16xGrxGfK6pDa7Lx_tBpzzSZ_ZKKKg8jC"},{"name":"한국교원대","region":"충북","url":"https://drive.google.com/open?id=1W3AcKDFSfpAfsGsz4i_arBSWaRNtRrRm"},{"name":"한국성서대","region":"서울","url":"https://drive.google.com/open?id=1sKkNx-YVx4iBpdk741uxBzpaLq9jaihQ"},{"name":"한국외대","region":"서울","url":"https://drive.google.com/open?id=18D47sENDi2Yq7W_SeRI8mOzlRSro58uG"},{"name":"한국체대","region":"서울","url":"https://drive.google.com/open?id=1SJDBGRhXREkCbwabba83tlnYKRrzH1-G"},{"name":"한국침례신학대학교","region":"대전","url":"https://drive.google.com/open?id=1m54i9tGf_K8vxK_-06N6Z-KLN62vXa56"},{"name":"한국항공대","region":"경기","url":"https://drive.google.com/open?id=1YUU4wJ9L8I7LzyH0cudbQFkoHgAFJJ2-"},{"name":"한성대","region":"서울","url":"https://drive.google.com/open?id=1TDK-UJueFe0bQxejGnmBta3y7GQ6sMvf"},{"name":"한세대","region":"경기","url":"https://drive.google.com/open?id=1WIBdL0StZq4jeCaM2FgtDqBB-qiSWNP5"},{"name":"한신대","region":"경기","url":"https://drive.google.com/open?id=15AxjX3ikuwRxCGQtmWgw8f5TJrFl78Mu"},{"name":"한양대","region":"서울","url":"https://drive.google.com/open?id=1L9GDoXkwtyU3pSDWpI-uarpPnDzbPQSZ"},{"name":"한양대(ERICA)","region":"경기","url":"https://drive.google.com/open?id=1-ScJVd9ICO7EIy_A9Fam7aqIrMAdYaOA"},{"name":"홍익대","region":"서울","url":"https://drive.google.com/open?id=1iWJU_uR5reI4JWpSombXZHwUlYfm7m7w"},{"name":"화성의과학대","region":"경기","url":"https://drive.google.com/open?id=1Vb84PfEafHQOFkkfg967zYJQLMs7VEtB"},{"name":"동국대(WISE)","region":"경북","url":"https://drive.google.com/file/d/1N066glyfNnLILySf8Rw7jzsszPjKdm8j/view?usp=drive_link"},{"name":"부산대","region":"부산","url":"https://drive.google.com/file/d/1npqTopTsZW1mW4M2lDzBOp3PH9wwJcZU/view?usp=drive_link"},{"name":"서울장신대","region":"경기","url":"https://drive.google.com/file/d/1wyJ5PRkqCv8IL-QQHUMFUch-XRaAehPy/view?usp=drive_link"},{"name":"전남대","region":"광주","url":"https://drive.google.com/file/d/1cIpvRgL0src-iSlpyqqUnlQl_2Iiqzym/view?usp=drive_link"},{"name":"중앙승가대","region":"경기","url":"https://drive.google.com/file/d/1o7JVtebQGiqBExAS855cPdAeXMP8_CGY/view?usp=drive_link"},{"name":"경인교대","region":"경기","url":"https://drive.google.com/file/d/1I1VO_0wmkkbZDqSSDJvjSZkVz2_3kTt9/view?usp=sharing"},
{"name":"한림대학교","region":"강원","url":"https://drive.google.com/open?id=1aCvkq3R9serD-BFpQ7Gr2VLr5mK3Spr4"},
{"name":"강원대(강릉)","region":"강원","url":"https://drive.google.com/open?id=147Su_DXjEYageaSYf0VJHGtjiYfPUKl8"},
{"name":"경성대학교","region":"부산","url":"https://drive.google.com/open?id=1o8tsRC3r_Ds5A4vBp4SESUhpmWCG1WTG"},
{"name":"국립창원대학교","region":"경남","url":"https://drive.google.com/open?id=1OZKOwKKzSdyPdCUfqYT0lcv-Mp-mdYIH"},
{"name":"경남대학교","region":"경남","url":"https://drive.google.com/open?id=1r3C_NUstsDoF89w-sfik1opfv3QqS3TD"},
{"name":"한국기술교육대학교","region":"충남","url":"https://drive.google.com/open?id=1wrrS0saxrt6oiHA6dK7lCoVr9-FGFdKn"},
{"name":"전주대학교","region":"전북","url":"https://drive.google.com/open?id=12TsREiCeoV6x5nPQISA4xNFe_8JmRIFX"},
{"name":"동의대학교","region":"부산","url":"https://drive.google.com/open?id=1nkktgMRwWc8Sy_8qWkGDDODWYdmUgpx3"},
{"name":"부경대학교","region":"부산","url":"https://drive.google.com/open?id=1r-zfNVbgFrHodXDpL_2UStwtRqzqMHtA"},
{"name":"동서대학교","region":"부산","url":"https://drive.google.com/open?id=1RZS0kUnKKqjy1Ow3Jj8S_K9g19sdULjD"},
{"name":"호남대학교","region":"광주","url":"https://drive.google.com/open?id=1t8Wa9AdKLwthToshz2DYu3ZaQvknPn8a"},
{"name":"동아대학교","region":"부산","url":"https://drive.google.com/open?id=1xyPRz-WdXpSg-UBn-U_x52qBEPUY6iga"},
{"name":"가야대학교","region":"경남","url":"https://drive.google.com/open?id=1nf4reUiXwS9FFscOxhaeUFyxRfU8d09A"},
{"name":"울산대학교","region":"울산","url":"https://drive.google.com/open?id=1dl0yo3oa7xaWt2jN1VL6KSBpReHsIDvp"},
{"name":"KAIST","region":"대전","url":"https://drive.google.com/open?id=1DbehNS2gYH7l1PnXy_73KbihpHUeUIry"},
{"name":"영남대학교","region":"경북","url":"https://drive.google.com/open?id=1KdGKzVK1RYx0ftOVBcOE9h81UTdLMfqi"},
{"name":"신라대학교","region":"부산","url":"https://drive.google.com/open?id=1z6zHKFfeP2xqOXW-KtcOEKaTT8FpGg7O"},
{"name":"고신대학교","region":"부산","url":"https://drive.google.com/open?id=1leQa6Cjn_fQ-wD5CZMqqIWxqrscm3kd3"},
{"name":"우송대학교","region":"대전","url":"https://drive.google.com/open?id=14Ol2QKMHCUP4DkRcRQtwA--2WiEtadHY"},
{"name":"한밭대학교","region":"대전","url":"https://drive.google.com/open?id=1VfqqLYakzsupQqz072yZ2lbS0VH6n9FN"},
{"name":"한남대학교","region":"대전","url":"https://drive.google.com/open?id=1OJPyvviDOkZqAXQmnk9TDKhv7EYOKe_D"},
{"name":"세한대학교","region":"전남","url":"https://drive.google.com/open?id=1g_FzwrUmMNwMosjhmM5ebr1dmnp7OtXT"},
{"name":"인제대학교","region":"경남","url":"https://drive.google.com/open?id=1Uhtm68igWmfQ8eTvh6quonzXbjktY2Ei"},
{"name":"나사렛대학교","region":"충남","url":"https://drive.google.com/open?id=1VT1Hwip3C7AYSd14-AOuEn4_G81X_zqk"},
{"name":"광주여자대학교","region":"광주","url":"https://drive.google.com/open?id=1lmEoGWF78XCgGmciPDJsDJJZrC65m3dM"},
{"name":"목포대학교","region":"전남","url":"https://drive.google.com/open?id=1itCSFZXr_704JmkbrmpVN6VDGgU-8krE"},
{"name":"영산대학교","region":"경남","url":"https://drive.google.com/open?id=1x6sMT04vL_GGKqmbDJJmY-nL_yez6RC0"},
{"name":"공주대학교","region":"충남","url":"https://drive.google.com/open?id=19Ndg58i3P2Zec8bN1nDt40Ku5a1fYm9_"},
{"name":"계명대학교","region":"경북","url":"https://drive.google.com/open?id=1zCWKHzS_ZH9XU7stBPApb7ztykjzkdVt"},
{"name":"백석대학교","region":"충남","url":"https://drive.google.com/open?id=1Eq45VQdyp8SV6UXdUjbRs1hZX0ZYEHTr"},
{"name":"UNIST","region":"울산","url":"https://drive.google.com/open?id=1WH-55Tra9XTXm0RSL442QeQBb4AAxfO9"},
{"name":"서원대학교","region":"충북","url":"https://drive.google.com/open?id=1e7zCJUMNptDrAca6YZEmCePbF9Ib6Qih"},
{"name":"호서대학교","region":"충남","url":"https://drive.google.com/open?id=1gQXAgnLNrn6gv48f4WWal5jP_WVTgo3C"},
{"name":"건양대학교","region":"충남","url":"https://drive.google.com/open?id=1M-mO8Qfg7MfMX0AQdobPDOHuMkg8nBVP"},
{"name":"원광대학교","region":"전북","url":"https://drive.google.com/open?id=1k06slJQ8OIqR3rB5Mvq-srmSG38ko2X_"},
{"name":"우석대학교","region":"전북","url":"https://drive.google.com/open?id=1vp2fM85aMmNcJOXL4Ozx3_fxlktbTyfw"},
{"name":"동신대학교","region":"전남","url":"https://drive.google.com/open?id=1dzy4JUVMUdzPVgAUpK0Jq_Pf3RNK-mI0"},
{"name":"DGIST","region":"대구","url":"https://drive.google.com/open?id=10BmBSAynQ7hcqHaIY3Oihx8VXPvBoT3a"},
{"name":"GIST","region":"광주","url":"https://drive.google.com/open?id=1oiI5uetLWYxFPu7W_96lG2fdVTWEZXJb"},
{"name":"광주대학교","region":"광주","url":"https://drive.google.com/open?id=13171DwngqNn0TliLswWxwwzKuvJi_B-o"},
{"name":"국립경국대","region":"경북","url":"https://drive.google.com/open?id=158uDikWkWrKaVKesHEmGmdshETK9WzJk"},
{"name":"경북대학교","region":"대구","url":"https://drive.google.com/open?id=1PiqNyXT4MY-c682UqwD8TMCfWwkS0MYn"},
{"name":"협성대학교","region":"경기","url":"https://drive.google.com/open?id=1d5VqsGEIWDIh0u8QTGfDKH9e93SKgu_g"},
{"name":"한동대학교","region":"경남","url":"https://drive.google.com/file/d/1VDEs9bECwHOLPpPQTjvfzqCvMUx-3R8u/view?usp=drive_link"},
{"name":"한국해양대학교","region":"부산","url":"https://drive.google.com/file/d/1A3-wD5LjlGtytsDQFQEUSs1A3DRSFD5z/view?usp=sharing"},
{"name":"조선대학교","region":"광주","url":"https://drive.google.com/file/d/15d7XNeZfIZ5F6D6p9kEk39Yz98FOf0Lc/view?usp=sharing"},
{"name":"순천대학교","region":"전남","url":"https://drive.google.com/file/d/1vI1oPVWyTH6bqR9oDTv9zBTBBI36Ws6Q/view?usp=drive_link"},
{"name":"경동대(양주)","region":"경기","url":"https://drive.google.com/file/d/1Sl6E8RsRZj0aznFGpRNbVOlXzy1YojSk/view?usp=drive_link"}];

// ── 데이터 통합 ──────────────────────────────────────────────────────────────
// PDF 맵 (간략명 → url) 생성 — 검색 매칭용 키 정규화
function normalize(s) {
  return s.replace(/\s|\(.*?\)|대학교$|대학$|대$/g, '').toLowerCase();
}

const recruitMap = new Map();
RECRUIT_RAW.forEach(u => {
  recruitMap.set(u.name + '|' + u.region, { url: u.url, region: u.region });
  recruitMap.set(normalize(u.name) + '|' + u.region, { url: u.url, region: u.region });
  recruitMap.set(u.name, { url: u.url, region: u.region });
  recruitMap.set(normalize(u.name), { url: u.url, region: u.region });
});

const pdfMap = new Map();
PDF_RAW.forEach(u => {
  pdfMap.set(u.name + '|' + u.region, { url: u.url, name: u.name, region: u.region });
  pdfMap.set(normalize(u.name) + '|' + u.region, { url: u.url, name: u.name, region: u.region });
  pdfMap.set(u.name, { url: u.url, name: u.name, region: u.region });
  pdfMap.set(normalize(u.name), { url: u.url, name: u.name, region: u.region });
});

// 홈 데이터를 통합 형태로 변환
const MERGED = []; // {name, region, type, homeUrl, pdfUrl}

Object.entries(HOME_RAW).forEach(([region, arr]) => {
  arr.forEach(([name, homeUrl, type]) => {
    const nk = normalize(name);
    const PDF_BLACKLIST = [];
    const pdfEntry = PDF_BLACKLIST.includes(name) ? null :
      pdfMap.get(name + '|' + region) || pdfMap.get(nk + '|' + region) ||
      pdfMap.get(name) || pdfMap.get(nk)
      || [...pdfMap.entries()].find(([k]) => k.includes(nk) || nk.includes(k))?.[1];
    const nk2 = normalize(name);
    const recruitEntry = recruitMap.get(name + '|' + region) || recruitMap.get(nk2 + '|' + region) ||
      recruitMap.get(name) || recruitMap.get(nk2)
      || [...recruitMap.entries()].find(([k]) => k === name || k === nk2)?.[1];
    MERGED.push({ name, region, type, homeUrl, pdfUrl: pdfEntry ? pdfEntry.url : null, recruitUrl: recruitEntry ? recruitEntry.url : null });
  });
});

// PDF는 있지만 홈 데이터가 없는 항목 추가
PDF_RAW.forEach(u => {
  const nk = normalize(u.name);
  const exists = MERGED.some(m => normalize(m.name) === nk || m.name === u.name
    || normalize(m.name).includes(nk) || nk.includes(normalize(m.name)));
  if (!exists) {
    const rEntry = recruitMap.get(u.name) || recruitMap.get(normalize(u.name));
    MERGED.push({ name: u.name, region: u.region, type: null, homeUrl: null, pdfUrl: u.url, recruitUrl: rEntry ? rEntry.url : null });
  }
});

MERGED.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

// 지역 목록
const REGION_ORDER = ['서울','경기','인천','강원','경남','경북','광주','대구','대전','부산','전남','전북','제주','충남','충북','울산'];
const allRegions = [...new Set(MERGED.map(u => u.region))];
const orderedRegions = REGION_ORDER.filter(r => allRegions.includes(r));

