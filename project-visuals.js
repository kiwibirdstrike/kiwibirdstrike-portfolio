// Sources point to the reviewed fields of the same project in portfolio-content.js.
window.PROJECT_VISUALS = {
  "port-matching": [{
    type: "architecture", placement: "approach", replacesWorkflow: true,
    title: "학습과 실제 선박 식별을 나눈 구조", sources: ["process"],
    lanes: [
      { title: "학습", stages: [
        { label: "자료 구성", nodes: [{ title: "선박 단위 분할", text: "학습·검증 자료 분리" }, { title: "입력 노이즈", text: "오타·단어 누락·톤수 오차" }] },
        { label: "모델 학습", nodes: [{ title: "한글 CE", text: "기록과 후보 정보를 함께 입력" }, { title: "비한글 CE", text: "언어별 모델을 분리해 학습" }] },
        { label: "검증", nodes: [{ title: "후보 묶음 단위 추론", text: "배치 구성에 따른 예측 변화 방지" }] }
      ] },
      { title: "추론", stages: [
        { label: "입력", nodes: [{ title: "입출항 기록", text: "선박명·국적·선종·톤수" }] },
        { label: "후보 축소", nodes: [{ title: "표기 정규화 + 검색", text: "이름 유사도와 톤수로 카탈로그 후보 검색" }] },
        { label: "정밀 비교", nodes: [{ title: "CE 순위화", text: "기록–후보의 일치 가능성 평가" }, { title: "추가 리랭커", text: "비한글 후보에 적용" }] },
        { label: "출력", nodes: [{ title: "최종 선박 연결", text: "후보 순위로 카탈로그의 선박 식별" }] }
      ] }
    ],
    caption: "현장의 입력 오류를 학습 조건에 반영하고, 추론에서는 전체 카탈로그 검색과 후보 정밀 비교의 역할을 분리했습니다."
  }],
  "eumseong-fire": [{
    type: "table", placement: "outcome", title: "비교 조건을 구분한 핵심 분석 결과", sources: ["result"],
    columns: ["확인한 내용", "결과", "비교 기준"],
    rows: [
      ["봄철 전체 화재율", "1.48배", "가을 대비 · 기상 등 보정"],
      ["봄철 부주의 화재율", "1.96배", "가을 대비 · 기상 등 보정"],
      ["10억원 이상 공장화재 11건", "재산피해의 62.1%", "전체 화재의 재산피해 합계 대비"],
      ["화학적 요인 공장화재", "3.8배", "공장 수 기준 기대 수준 대비"],
      ["화학적 요인 공장화재", "2.9배", "업종 구성을 보정한 비교"]
    ],
    caption: "비율의 분모와 보정 조건이 달라 하나의 순위로 비교하지 않습니다. 후속 예방 목표는 제안이며 실제 채택·달성 여부는 확인되지 않았습니다."
  }],
  "jobis": [{
    type: "architecture", placement: "approach", replacesWorkflow: true,
    title: "공고 수집·파싱과 사용자 서비스를 연결한 구조", sources: ["process"],
    lanes: [
      { title: "데이터와 파싱 모델", stages: [
        { label: "수집", nodes: [{ title: "조달청 Open API", text: "공고 JSON과 첨부 공고문" }] },
        { label: "Stage 1", nodes: [{ title: "근거 추출", text: "입찰 판단에 필요한 evidence를 넓게 수집" }] },
        { label: "Stage 2", nodes: [{ title: "조건 구조화", text: "면허·인증·실적·인력·제출서류로 매핑" }] },
        { label: "저장", nodes: [{ title: "PostgreSQL", text: "원자료와 구조화된 공고 데이터" }] }
      ] },
      { title: "사용자 서비스", stages: [
        { label: "화면", nodes: [{ title: "Next.js", text: "공고 확인과 기업 정보 입력" }] },
        { label: "연결", nodes: [{ title: "FastAPI", text: "DB·파서·공고 분류·서비스 기능 통합" }] },
        { label: "판정", nodes: [{ title: "기업 정보와 조건 비교", text: "공고의 참가자격 검토" }] }
      ] }
    ], caption: "파싱은 놓치지 않고 찾는 단계와 실제 조건을 고르는 단계로 나눴습니다. 서비스 통합에 더해 파싱 모델 개발을 직접 맡았습니다."
  }, {
    type: "table", placement: "outcome", title: "단계별 평가 결과와 남은 문제", sources: ["result"],
    columns: ["평가", "결과", "평가 범위"],
    rows: [
      ["Stage 1 근거 추출", "Recall 100%", "공고 100건을 직접 검수한 605개 truth row"],
      ["Stage 2 조건 구조화", "76 / 87 필드 일치", "API 비교 가능 필드 · 정확도 87.36%"],
      ["자동 audit", "1,000건 점검", "파이프라인의 구조적 안정성 확인"],
      ["남은 과제", "오류 위치 탐지", "오류가 분산되어 사람이 전체 공고를 재검수해야 함"]
    ], caption: "단계별 분모와 평가 목적이 다릅니다. 높은 근거 추출률만으로 최종 판정의 정확도나 자동화 효율을 설명할 수는 없었습니다."
  }],
  "lg-aimers-9": [{
    type: "architecture", placement: "approach", replacesWorkflow: true,
    title: "손실함수별로 학습하고 성공 확률에서 결합", sources: ["process"],
    lanes: [{ title: "학습 목표를 분리한 확률 예측", stages: [
      { label: "입력", nodes: [{ title: "투구 상황과 과거 이력", text: "선수·팀·상황 기반 피처" }] },
      { label: "별도 학습", nodes: [{ title: "이진 분류 모델", text: "성공 / 실패 → 성공 확률" }, { title: "4클래스 분류 모델", text: "성공 + 실패 3유형 → 성공 클래스 확률" }] },
      { label: "결합", nodes: [{ title: "확률 블렌딩", text: "두 모델이 출력한 성공 확률 결합" }] },
      { label: "평가", nodes: [{ title: "Brier Skill Score", text: "두 손실의 동시 최적화 방식과 비교" }] }
    ] }],
    caption: "병렬로 그린 두 모델은 각각 다른 손실함수로 학습했습니다. 이 그림은 제가 비교한 학습 방식이며, 팀 전체 앙상블의 모든 모델을 나타내지는 않습니다."
  }],
  "tvspline": [{
    type: "architecture", placement: "approach", replacesWorkflow: true,
    title: "사용자 인터페이스와 모형별 구현을 분리한 호출 계층", sources: ["process", "result"],
    lanes: [
      { title: "패키지 호출 구조", stages: [
        { label: "공개 인터페이스", nodes: [{ title: "tvspline()", text: "모형을 공통 방식으로 실행" }] },
        { label: "모형별 내부 함수", nodes: [{ title: "평균 · 분위수 · 밀도", text: "각 모형의 적합 로직" }, { title: "가법 · 단일지수 · Polygram", text: "모형별 차이를 백엔드에 분리" }] },
        { label: "공통 기반", nodes: [{ title: "공통 유틸리티", text: "중복 기능 통합" }, { title: "Rcpp 연산 코드", text: "패키지 구조에 맞춰 연결" }] }
      ] },
      { title: "개발과 검증", stages: [
        { label: "구조 점검", nodes: [{ title: "호출 그래프", text: "입력·출력·의존 관계 확인" }] },
        { label: "동작 확인", nodes: [{ title: "testthat", text: "의도한 동작을 검증하는 테스트" }] },
        { label: "배포 준비", nodes: [{ title: "문서·예제·버전 관리", text: "roxygen2와 GitHub 활용" }] }
      ] }
    ], caption: "실행 순서와 개발 절차를 나눠 표현했습니다. 6개 연구 모형을 사용자가 같은 방식으로 실행하고 결과를 활용할 수 있도록 구성했습니다."
  }],
  "polygram": [{
    type: "architecture", placement: "approach", title: "조성자료의 기하 구조에서 적합과 해석까지", sources: ["process"],
    lanes: [
      { title: "모형 정의", stages: [
        { label: "입력", nodes: [{ title: "세 성분 조성자료", text: "합이 1인 simplex의 자료" }] },
        { label: "좌표와 표면", nodes: [{ title: "ILR 변환 · 삼각분할", text: "삼각형마다 선형 logit surface 구성" }] },
        { label: "복잡도 조절", nodes: [{ title: "기울기 변화의 L1 벌점", text: "인접 삼각형의 불필요한 변화 억제" }] }
      ] },
      { title: "적합과 해석", stages: [
        { label: "최적화", nodes: [{ title: "ADMM", text: "로지스틱 음의 로그우도 + 벌점 최적화" }] },
        { label: "모형 선택", nodes: [{ title: "Penalty path · AIC", text: "벌점 강도에 따른 모형 비교" }] },
        { label: "원래 공간으로", nodes: [{ title: "Simplex 역변환", text: "확률 표면과 활성 edge 해석" }] }
      ] }
    ], caption: "적합은 ILR 공간에서, 해석은 원래 조성 공간에서 수행했습니다. 벌점은 데이터가 뒷받침하는 국소 추세 변화만 남기도록 설계했습니다."
  }],
  "gcer": [{
    type: "table", placement: "outcome", title: "MuSiQue 평가 질문 2,417개의 근거 검색 결과", sources: ["validation", "result", "limitation"],
    columns: ["지표", "결과", "측정하는 것"],
    rows: [["Recall@5", "71.1%", "상위 5개 문단의 근거 재현율"], ["Recall@10", "80.3%", "상위 10개 문단의 근거 재현율"], ["3,000토큰 완전 근거율", "67.6%", "필요한 근거가 문맥 안에 모두 포함된 질문 비율"]],
    caption: "같은 임베딩과 LLM을 사용해 비교했습니다. 근거 검색 지표와 최종 답변 지표는 별개이며, 분기형 질문과 일부 답변 F1 비교에서는 유의한 차이가 없었습니다."
  }],
  "booth-layout": [{
    type: "architecture", placement: "approach", title: "예측을 실제 배치 의사결정으로 연결", sources: ["process"],
    lanes: [{ title: "배치안 도출", stages: [
      { label: "예측", nodes: [{ title: "기업별 인기도 모델", text: "기업별 예상 인기도 산출" }] },
      { label: "모델링", nodes: [{ title: "가중치가 있는 그래프", text: "인기도를 부스별 가중치로 설정" }] },
      { label: "최적화", nodes: [{ title: "배치 문제 정식화", text: "부스 가중치를 활용한 배치안 탐색" }] },
      { label: "검토", nodes: [{ title: "시뮬레이션 비교", text: "기존 배치안과 부스 방문도 비교" }] }
    ] }], caption: "예측의 출력값이 다음 최적화 문제의 입력값이 되도록 설계했습니다."
  }, {
    type: "bars", placement: "outcome", title: "시뮬레이션에서의 부스 방문도", sources: ["result"], unit: "지수", max: 120,
    rows: [{ label: "기존 배치", value: 100, display: "100", reference: true }, { label: "최적화 배치", value: 118, display: "118" }],
    derivation: { baseline: 100, increasePercent: 18 },
    caption: "기존 배치를 100으로 환산한 지수입니다. 시뮬레이션의 방문도 증가율 18%를 나타내며, 실제 행사에서 측정한 방문객 수는 아닙니다."
  }],
  "lh-vacancy": [{
    type: "table", placement: "outcome", title: "관찰한 관계와 해석의 범위를 구분", sources: ["process", "result"],
    columns: ["분석 단계", "확인한 내용", "해석·반영"],
    rows: [["자료 결합", "상권·교통 접근성·공시지가", "기준 시점과 시차를 맞춰 공실률 자료와 결합"], ["XGBoost · SHAP", "교통편의성이 높은 지역에서 공실률도 높게 나타남", "입지와 함께 공시지가·임대 부담을 검토"], ["정책 제안", "접근성과 입주 비용을 함께 고려", "비용 상승이 공실을 유발한다는 인과 검증은 아님"]],
    caption: "예측 모형에서 관찰된 관계를 정책 검토의 근거로 사용했습니다. 비공개 자료 접근 제한으로 후속 실증은 수행하지 못했습니다."
  }],
  "wine-survey": [{
    type: "architecture", placement: "approach", replacesWorkflow: true, title: "단맛 인식을 먼저 예측하는 단계적 분류", sources: ["process"],
    lanes: [
      { title: "목표변수 검토", stages: [
        { label: "소비자 응답", nodes: [{ title: "Dry · Sweet · Medium", text: "같은 단맛도 사람마다 분류 기준이 다름" }, { title: "Sweetness 평가", text: "상대적으로 일관된 응답 패턴 확인" }] },
        { label: "설계 판단", nodes: [{ title: "Sweetness를 중간 목표로", text: "불일치한 범주 응답을 바로 예측하지 않음" }] }
      ] },
      { title: "모델 구조", stages: [
        { label: "1단계", nodes: [{ title: "단맛 인식 모델", text: "소비자가 와인을 얼마나 달게 느끼는지 예측" }] },
        { label: "2단계", nodes: [{ title: "Decision Tree", text: "예측한 단맛을 최종 분류로 연결" }] },
        { label: "출력", nodes: [{ title: "Dry · Sweet · Medium", text: "조건별 분기 규칙으로 범주 결정" }] }
      ] }
    ], caption: "핵심은 특정 알고리즘의 선택보다 목표변수의 신뢰성을 검토하고 예측 순서를 바꾼 데 있습니다."
  }],
  "weather-study": [{
    type: "table", placement: "approach", title: "학습 참여를 바꾸기 위한 팀 운영 설계", sources: ["problem", "process", "result"],
    columns: ["운영 방식", "구성원이 하는 일", "운영자의 역할"],
    rows: [["학습자료 제공", "자료를 받아 개별 학습", "공부자료 제작 · 학습이 이어지는지 확인"], ["발표형 세미나", "공부한 내용을 준비해 발표", "발표와 결과 공유 중심으로 모임 운영"], ["실제 데이터 분석", "공모전에서 분석하고 결과 제출", "119 신고·열 수요·지하철 혼잡도 분석으로 연결"]],
    caption: "운영 방식을 바꾼 뒤 발표 준비를 통한 학습과 실제 분석으로 이어졌습니다. 119 신고와 지하철 혼잡도 두 부문에서 입선했습니다."
  }],
  "khd": [{
    type: "architecture", placement: "approach", title: "폐쇄망에서 직접 구현한 신호 분류 흐름", sources: ["process"],
    lanes: [{ title: "신호에서 분류까지", stages: [
      { label: "데이터", nodes: [{ title: "EDF 신호", text: "불균형에 대응한 균등 샘플링" }] },
      { label: "특징 추출", nodes: [{ title: "웨이블릿 변환", text: "신호의 특징을 모델 입력으로 변환" }] },
      { label: "분류", nodes: [{ title: "Random Forest", text: "추출한 특징으로 장애 분류" }] },
      { label: "사용 목적", nodes: [{ title: "1차 선별", text: "전문가의 영상 검토를 보조" }] }
    ] }], caption: "준비한 Docker 환경이 현장에서 작동하지 않아, 필요한 분석 함수를 직접 정의해 사용했습니다."
  }, {
    type: "bars", placement: "outcome", title: "대회 평가에서 확인한 두 분류 과제의 정확도", sources: ["result"], unit: "%", max: 100,
    rows: [{ label: "수면 장애 유형 구분", value: 69, display: "69%", evidence: "69%" }, { label: "수면 장애 존재 여부", value: 97, display: "97%", evidence: "97%" }],
    caption: "분류 대상이 다른 두 과제의 결과입니다. 유형 구분과 장애 유무 선별을 구분해 모델의 역할을 해석했습니다."
  }],
  "care-demand": [{
    type: "architecture", placement: "approach", title: "수요·인력 예측을 지역별 위험도로 연결", sources: ["process"],
    lanes: [{ title: "연도별 자료 분석", stages: [
      { label: "자료 구성", nodes: [{ title: "2012–2023년", text: "12개 연도 · 행정구역 변동 보간" }] },
      { label: "예측", nodes: [{ title: "요양보호사 수", text: "재가·시설 구분을 반영한 계층적 예측" }, { title: "장기요양급여자 수", text: "ETS 기반 수요 예측" }] },
      { label: "집계와 비교", nodes: [{ title: "Bottom-up", text: "집계 방식 비교 후 선택" }] },
      { label: "위험도", nodes: [{ title: "요양 방치 지수", text: "노인 수 ÷ 요양보호사 수" }] }
    ] }], caption: "짧은 연 단위 자료의 조건에 맞춰 예측 방법을 선택하고, 인력 구성과 의료 접근성까지 비교했습니다."
  }, {
    type: "bars", placement: "outcome", title: "위험·안전 지역의 재가 요양보호사 비중", sources: ["result"], unit: "%", max: 100,
    rows: [{ label: "위험 지역", value: 96.8, display: "96.8%", evidence: "96.8%" }, { label: "안전 지역", value: 68.5, display: "68.5%", evidence: "68.5%" }],
    caption: "각 집단의 요양보호사 중 재가 인력 비중입니다. 인력의 총규모뿐 아니라 재가·시설 구성과 의료 접근성을 함께 검토했습니다."
  }],
  "sports-location": [{
    type: "architecture", placement: "approach", title: "예산 조건을 바꾸며 비교하는 입지 최적화", sources: ["process"],
    lanes: [{ title: "정책 시나리오 → 배치 대안", stages: [
      { label: "입력", nodes: [{ title: "인구·수요", text: "인구 분포와 수요의 시간적 변화" }, { title: "시설·접근성·예산", text: "시설 위치와 재정 시나리오" }] },
      { label: "수요 변화", nodes: [{ title: "Trend Filtering", text: "시간에 따른 지역 수요 변화 반영" }] },
      { label: "입지 최적화", nodes: [{ title: "MCLP", text: "예산 시나리오별 최적 입지 후보 도출" }] },
      { label: "사용자 도구", nodes: [{ title: "웹 시뮬레이션", text: "예산을 바꾸고 대안별 결과 비교" }] }
    ] }], caption: "한 번의 배치안 제시에 그치지 않고, 정책 담당자가 재정 조건을 바꾸며 대안을 비교할 수 있도록 구성했습니다."
  }],
  "kamp": [{
    type: "architecture", placement: "approach", title: "센서 데이터에서 현장 담당자의 해석까지", sources: ["process"],
    lanes: [{ title: "예측과 설명을 연결한 도구", stages: [
      { label: "데이터 이해", nodes: [{ title: "센서 분포·이상값", text: "현장 담당자에게 공정 변수의 의미 확인" }] },
      { label: "예측", nodes: [{ title: "전처리 + 예측 모델", text: "이상값을 고려한 학습" }] },
      { label: "설명", nodes: [{ title: "LLM 설명 기능", text: "LangChain·GPT API로 결과를 풀어 설명" }] },
      { label: "사용", nodes: [{ title: "웹 분석 화면", text: "주요 변수 입력 → 예측·설명 확인" }] }
    ] }], caption: "공정의 의미는 현장 담당자의 설명을 바탕으로 파악했습니다. 모델의 내부 구조를 몰라도 결과를 확인할 수 있도록 구현 범위를 정했습니다."
  }],
  "english-survey": [{
    type: "table", placement: "outcome", title: "설문 해석에 필요한 질문과 분석 근거", sources: ["process", "result"],
    columns: ["확인할 질문", "사용한 분석", "담당자에게 설명한 내용"],
    rows: [["문항들이 무엇을 측정하는가?", "요인분석", "만족도·학습 효과·난이도 관련 문항의 요인 구조"], ["같은 개념을 일관되게 측정하는가?", "Cronbach’s α · McDonald’s ω", "문항의 내적 일관성"], ["레벨별 응답은 어떻게 다른가?", "레벨별 만족도 비교", "레벨반 운영을 검토할 차이와 해석"]],
    caption: "설문 집계에 앞서 측정 구조와 신뢰도를 검토하고, 레벨반 운영에 필요한 해석을 담당자에게 전달했습니다."
  }],
  "lab-rooms": [{
    type: "architecture", placement: "approach", title: "관리 부담을 줄인 서버리스 예약 구조", sources: ["process"],
    lanes: [{ title: "예약·조회·취소 요청", stages: [
      { label: "모바일", nodes: [{ title: "PWA", text: "주간 일정·예약·상세·취소 화면" }] },
      { label: "서버 기능", nodes: [{ title: "Pages Functions", text: "공유 PIN 검증 · 예약 조건 확인" }] },
      { label: "일정 저장", nodes: [{ title: "Google Calendar", text: "서비스 계정으로 두 미팅룸 일정 관리" }] },
      { label: "화면 반영", nodes: [{ title: "일정 캐시 갱신", text: "예약 결과와 최신 일정 표시" }] }
    ] }], caption: "프런트엔드는 Cloudflare Pages에 배포했습니다. 졸업 후에도 별도 서버 관리 부담 없이 운영할 수 있도록 익숙한 캘린더 기능을 활용했습니다."
  }],
  "autoresearch": [{
    type: "architecture", placement: "approach", title: "지식그래프와 실험 실행 하네스의 연결", sources: ["process"],
    lanes: [{ title: "지식 참조부터 실행·평가·기록까지", stages: [
      { label: "지식 연결", nodes: [{ title: "옵시디언 지식그래프", text: "통계 이론·검증 방법·모델링 전략 참조" }, { title: "실험 이력", text: "과거 설정·점수·실패 원인 참조" }] },
      { label: "가설", nodes: [{ title: "베이스라인과 개선안", text: "과제와 데이터 구조를 분석해 제안" }] },
      { label: "하네스: 실행·평가", nodes: [{ title: "실험 실행과 지표 비교", text: "가설을 실제 실행하고 평가 결과 수집" }] },
      { label: "하네스: 기록", nodes: [{ title: "설정·점수·실패 원인", text: "후속 가설과 함께 다음 반복에 제공" }] }
    ] }], loop: "하네스에 기록한 실험 결과 → 다음 가설의 입력",
    caption: "지식그래프를 에이전트에 연결하고, 실험 실행·평가·기록을 담당하는 하네스를 구성했습니다. 사람은 과적합 위험과 연구 방향을 관리했습니다."
  }, {
    type: "table", placement: "outcome", title: "같은 실험 하네스를 적용한 두 과제", sources: ["result"],
    columns: ["과제", "데이터·문제", "결과"],
    rows: [["구조물 안정성", "비전 기반 물리 추론", "484팀 중 37위"], ["스마트 창고", "정형 시계열 회귀", "607팀 중 72위"]],
    caption: "대회와 평가 기준이 달라 순위를 성능 지표처럼 직접 비교하지 않습니다. 서로 다른 문제에 같은 실험·기록 구조를 적용한 사례입니다."
  }],
  "worldquant": [{
    type: "table", placement: "approach", title: "알파 후보를 선택할 때 함께 본 기준", sources: ["process", "result"],
    columns: ["검토 대상", "지표·방법", "확인하려던 문제"],
    rows: [["위험 대비 성과", "Sharpe · drawdown", "수익률만 높고 위험은 큰 신호인지"], ["거래 부담", "turnover · 거래비용", "매매 빈도가 실제 효율을 낮추는지"], ["거래 효율", "fitness · margin", "수익성과 거래 효율의 균형"], ["중복·과적합", "alpha correlation · 기간별 비교", "유사 신호 중복과 특정 기간에 대한 과적합"]],
    caption: "수익률 하나로 후보를 고르지 않고 위험, 거래 부담, 신호 중복과 기간별 안정성을 함께 검토했습니다."
  }],
  "media-trust": [{
    type: "composition", placement: "outcome", title: "출처 확인 지원의 우선 적용 대상으로 분류한 청소년", sources: ["process", "result"],
    total: 2674, selected: 1470, selectedLabel: "우선 적용군", otherLabel: "그 외 응답자",
    conditions: ["5개 정보 경로 중 3개 이상에 이용·접촉 응답", "뉴스 사이트·언론사 직접접속 이용 응답 없음"],
    caption: "전체 2,674명 중 1,470명으로 55.0%입니다. 직접접속 응답이 없다는 사실을 원문 기사를 전혀 읽지 않는다는 뜻으로 해석하지 않았습니다."
  }]
};
