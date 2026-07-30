window.PORTFOLIO_DATA = {
  profile: {
    eyebrow: "데이터 분석 · 통계 모델링 · 업무 자동화",
    name: "이주성",
    title: "데이터로 문제를 분석하고, 실제 의사결정과 업무 개선까지 연결합니다.",
    lead:
      "통계와 데이터 분석을 기반으로 문제를 정의하고 모델을 설계해 왔습니다. 최근에는 반복 작업은 에이전트로 자동화하고, 중요한 판단은 사람이 검토할 수 있도록 업무 과정을 설계하는 데 관심을 넓히고 있습니다.",
    education: "충북대학교 정보통계학과 학사 · 석사과정",
    principles: [
      "프롬프트보다 반복 가능한 프로세스를 설계합니다.",
      "평균 성능보다 오류가 발생하는 위치와 비용을 확인합니다.",
      "자동화할 업무와 사람이 판단할 지점을 구분합니다."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/kiwibirdstrike" },
      { label: "JOBIS", href: "https://www.gonggoradar.kr/" }
    ]
  },
  tracks: [
    {
      id: "agent",
      number: "01",
      title: "데이터 분석·모델링·AI 자동화",
      summary:
        "통계적 분석과 예측 모델링으로 금융·공공 문제를 다뤄 왔습니다. 최근에는 반복 가능한 작업을 에이전트로 자동화하고, 사람이 검토해야 할 판단에 더 집중할 수 있는 업무 구조로 확장하고 있습니다.",
      evidence: "JOBIS · AutoResearch · WorldQuant · 자동투자 포트폴리오"
    },
    {
      id: "bio",
      number: "02",
      title: "바이오·의료 통계",
      summary:
        "예측 정확도뿐 아니라 통계적 추론과 도메인 타당성까지 확인하는 분석을 이어가고 있습니다.",
      evidence: "Imputation · 디지털 바이오 · KHD"
    }
  ],
  featuredProjects: [
    {
      id: "jobis",
      title: "JOBIS",
      subtitle: "공공조달 공고 적격성 판정 에이전트",
      period: "2026.03 — 2026.06",
      track: "agent",
      status: "서비스 구축",
      media: {
        src: "./assets/projects/jobis-dashboard.png",
        alt: "JOBIS 공공조달 공고 검토 워크스페이스 화면"
      },
      summary:
        "조달 공고의 참가자격을 추출하고 기업 정보와 대조하는 업무를 2-stage 에이전트와 실제 웹서비스로 구현했습니다.",
      problem:
        "공고를 놓치는 오류는 사업 기회 손실로, 원문에 없는 조건을 제시하는 오류는 불필요한 준비 비용으로 이어졌습니다.",
      role:
        "팀장으로서 서비스 기획, 전체 모델링 구조, 데이터 흐름, 모델 입출력 스키마, 프런트·백엔드 통합과 배포를 설계했습니다.",
      process: [
        "조달청 API와 첨부 공고문을 수집해 PostgreSQL에 저장",
        "Stage 1은 필요한 근거를 recall-first로 회수",
        "Stage 2는 면허·실적·인력·서류 스키마로 구조화",
        "Next.js, FastAPI, Cloud Run, Vercel을 연결해 서비스 배포"
      ],
      validation:
        "공고 100건에서 만든 605개 정답 행으로 Stage 1을 검증하고, Stage 2는 API 비교 가능한 87개 필드를 평가했습니다.",
      result:
        "Stage 1 Recall 100%, Stage 2 필드 일치 정확도 87.36%. 실제 서비스와 커스텀 도메인까지 연결했습니다.",
      limitation:
        "잔여 오류가 전체 결과에 분산돼 전수검수 없이 실패 위치를 찾기 어려웠습니다. 이 경험이 신뢰도·근거 추적·검토 대상 선별에 대한 후속 관심으로 이어졌습니다.",
      links: [
        { label: "서비스", href: "https://www.gonggoradar.kr/" },
        { label: "GitHub", href: "https://github.com/kiwibirdstrike/jobis" }
      ]
    },
    {
      id: "autoresearch",
      title: "AutoResearch",
      subtitle: "지식과 실험 이력을 재사용하는 분석 에이전트",
      period: "2026.03 — 2026.05",
      track: "agent",
      status: "경진대회 적용",
      media: null,
      summary:
        "옵시디언에 축적한 통계·모델링 지식과 실험 결과를 에이전트가 읽고 다음 가설을 제안하는 반복 연구 구조를 만들었습니다.",
      problem:
        "데이터 유형이 바뀔 때마다 수작업 탐색을 처음부터 반복하면 실패 원인과 유효한 지식이 다음 문제에 축적되지 않았습니다.",
      role:
        "문제 분석, 베이스라인, 가설 제안, 실험, 평가, 지식 갱신이 반복되는 AutoResearch 루프를 설계하고 두 대회에 적용했습니다.",
      process: [
        "통계 이론과 검증 원칙을 검색 가능한 연구 컨텍스트로 구성",
        "실험 설정·점수·실패 원인·후속 가설을 구조적으로 기록",
        "비전 기반 물리 추론과 정형 시계열 회귀에 동일 구조 적용"
      ],
      validation:
        "서로 다른 데이터 유형의 DACON 두 대회에서 동일한 연구 프로세스가 재사용되는지 확인했습니다.",
      result:
        "구조물 안정성 대회 484팀 중 37위, 스마트 창고 출고 지연 대회 607팀 중 72위를 기록했습니다.",
      limitation:
        "에이전트의 상태·컨텍스트 구조별 기여도를 분리해 비교하지는 못했습니다. 이를 짧은 졸업논문 연구 후보로 확장하고 있습니다.",
      links: []
    },
    {
      id: "quant-agent",
      title: "자동투자 포트폴리오",
      subtitle: "편향 통제 백테스트와 주문 계획 에이전트",
      period: "2026.06 — 현재",
      track: "agent",
      status: "운영·확장 중",
      media: null,
      summary:
        "WorldQuant에서 익힌 알파 검증 기준을 실제 계좌 상태, 위험 규칙과 주문 계획을 연결하는 개인 포트폴리오 에이전트로 확장했습니다.",
      problem:
        "높은 백테스트 성과가 특정 기간·종목·미래정보에 의존한다면 실제 투자 의사결정에 사용할 수 없습니다.",
      role:
        "모델 개발과 운영 구조를 직접 설계하고, 모델 계산·계좌 조회·주문 계획·위험 검증을 분리했습니다.",
      process: [
        "공시 가용 시점과 다음 거래일 체결 기준을 적용",
        "생존편향·승자 종목 제거·정보 지연 스트레스 검증",
        "수수료 10bp, 슬리피지 10bp, 정수주와 리밸런싱 밴드 반영",
        "토스증권 API로 계좌 조회와 승인 기반 주문 계획 연결"
      ],
      validation:
        "파라미터를 잠근 뒤 최대 가용 기간, N-PORT 60일 추가 지연, 상위 5개 수익 기여 종목 제거 조건을 검증했습니다.",
      result:
        "2021.01~2026.07 실행조건 반영 백테스트에서 CAGR 54.96%, Sharpe 1.91, MDD -14.86%를 기록했습니다.",
      limitation:
        "백테스트 결과는 실제 수익을 보장하지 않습니다. 현재 실제 운용 기록과 OpenDART 기반 SQL 재무 데이터마트를 추가하고 있습니다.",
      links: []
    },
    {
      id: "imputation",
      title: "Imputation 연구",
      subtitle: "예측 오차와 후속 통계 추론의 동시 평가",
      period: "2026.01 — 현재",
      track: "bio",
      status: "논문 작성 중",
      media: null,
      summary:
        "MICE, 3D-MICE, SAITS를 비교해 결측값 복원 성능뿐 아니라 회귀계수 편향과 신뢰구간 타당성을 함께 평가합니다.",
      problem:
        "딥러닝 기반 대치의 낮은 예측 오차가 이후 통계적 추론의 신뢰성을 보장하는지는 충분히 확인되지 않았습니다.",
      role:
        "MAR 결측 시뮬레이션과 PhysioNet 2012 ICU 실자료 분석, GEE 기반 후속 추론 평가를 수행했습니다.",
      process: [
        "표본 수·반복 측정·결측률이 다른 종단자료 시나리오 설계",
        "MICE, 3D-MICE, SAITS로 결측값 대치",
        "예측 오차와 GEE 계수 편향·95% 포함률 비교",
        "R·Python 실행 과정과 논문 원고 정리"
      ],
      validation:
        "비선형 궤적과 개인별 이질성을 포함한 조건, 단순한 선형 시간 추세 조건을 분리해 비교했습니다.",
      result:
        "일부 조건에서 SAITS와 3D-MICE의 예측 성능이 경쟁력 있었지만, MICE의 신뢰구간 포함률이 상대적으로 안정적임을 확인했습니다.",
      limitation:
        "현재 투고·게재 전인 진행 중 연구이며, 결과와 원고를 마무리하고 있습니다.",
      links: []
    },
    {
      id: "polygram",
      title: "ILR Polygram",
      subtitle: "조성자료를 위한 국소 로지스틱 회귀 연구",
      period: "2026.03 — 현재",
      track: "bio",
      status: "Under Review",
      media: null,
      summary:
        "세 성분 조성형 예측변수의 국소적·비선형 이진 반응 구조를 simplex 위에서 추정하고 해석하는 방법론을 연구합니다.",
      problem:
        "일반적인 유클리드 회귀와 전역 선형 경계는 조성자료의 상대적 비율과 국소 구조를 충분히 반영하지 못했습니다.",
      role:
        "방법론 설명, 추정 알고리즘, 시뮬레이션, ATUS 실증 분석과 재현 코드를 논문 구조로 통합했습니다.",
      process: [
        "ILR 좌표 변환과 simplex 역변환 해석",
        "삼각분할 위 piecewise-linear logit surface 구성",
        "edge-wise L1 penalty와 ADMM 최적화",
        "ATUS 2022~2024 시간 사용 조성 실증 분석"
      ],
      validation:
        "전역 선형·국소 경계 시뮬레이션에서 로지스틱 회귀, GAM, SVM과 예측 및 경계 복원 성능을 비교했습니다.",
      result:
        "IMS-APRM 2026과 한국통계학회에서 동일 연구를 포스터 발표했으며, 현재 Under Review 중입니다.",
      limitation:
        "심사 중인 연구로, 결과와 방법론의 최종 내용은 심사 결과에 따라 변경될 수 있습니다.",
      links: [
        { label: "ILR Polygram GitHub", href: "https://github.com/kiwibirdstrike/PolygramLCR" }
      ]
    },
    {
      id: "lh-vacancy",
      title: "LH 지식산업센터 공실률 분석",
      subtitle: "입지와 비용 요인을 활용한 공실 위험 분석",
      period: "2025.01 — 2025.02",
      track: "agent",
      status: "장려상",
      media: null,
      summary:
        "지식산업센터의 공실에 영향을 주는 입지·비용 요인을 모델링하고, SHAP으로 요인별 영향과 상충관계를 해석했습니다.",
      problem:
        "공실 위험은 입지, 교통, 분양가 등 여러 요인이 함께 작용해 단일 지표만으로 설명하기 어려웠습니다.",
      role:
        "분석 문제 정의, 변수 구성, 예측 모델링과 결과 해석을 맡아 정책적 시사점으로 정리했습니다.",
      process: [
        "공실률과 입지·비용 관련 변수 정제",
        "XGBoost 기반 공실 위험 모델 구축",
        "SHAP을 활용한 주요 요인과 상충관계 해석"
      ],
      validation:
        "예측 성능과 해석 결과를 함께 검토하고, 변수별 영향 방향이 실제 입지 조건과 부합하는지 확인했습니다.",
      result:
        "71팀 중 3위로 장려상을 수상했습니다.",
      limitation:
        "대회 이후 비공개 데이터를 계속 활용할 수 없어 후속 정책 분석으로 확장하지 못했습니다.",
      links: []
    },
    {
      id: "sports-location",
      title: "공공체육시설 입지 분석",
      subtitle: "시설 접근성을 고려한 최적 입지 선정",
      period: "2025.09 — 2025.11",
      track: "agent",
      status: "우수상",
      media: null,
      summary:
        "지역별 수요와 접근성을 반영해 공공체육시설 후보지를 비교하고, 정책 담당자가 결과를 확인할 수 있는 웹 도구로 구현했습니다.",
      problem:
        "시설 입지는 전체 수요뿐 아니라 기존 시설과의 거리, 지역별 접근성 차이를 함께 고려해야 했습니다.",
      role:
        "수요 추정, 입지 최적화 모델링, 결과 시각화와 웹 도구 구현을 수행했습니다.",
      process: [
        "지역별 수요와 기존 시설 접근성 데이터 구성",
        "MCLP 기반 후보지 최적화",
        "Trend Filtering을 활용한 수요 변화 반영",
        "후보지별 결과를 비교하는 웹 화면 구현"
      ],
      validation:
        "입지 수와 거리 기준을 바꿔도 후보지 선택이 어떻게 달라지는지 시나리오별로 비교했습니다.",
      result:
        "정책 시뮬레이션이 가능한 웹 도구로 완성해 우수상을 수상했습니다.",
      limitation:
        "실제 정책 적용 전에는 이동시간과 시설별 수용능력에 대한 추가 검증이 필요합니다.",
      links: [
        { label: "GitHub", href: "https://github.com/kiwibirdstrike/chungju" }
      ]
    },
    {
      id: "digital-bio",
      title: "디지털 바이오 데이터 분석",
      subtitle: "유전체 변이 기반 암종 분류",
      period: "2024.08 — 2024.10",
      track: "bio",
      status: "은상",
      media: null,
      summary:
        "고차원 유전체 변이 데이터에서 암종을 구분하는 특징을 찾고 분류 모델을 구축했습니다.",
      problem:
        "변수 수가 많고 희소한 유전체 데이터에서는 과적합을 줄이면서 암종별 신호를 구분해야 했습니다.",
      role:
        "데이터 전처리, 특징 선택, 모델 비교와 검증을 수행했습니다.",
      process: [
        "희소 유전체 변이 데이터 정제",
        "특징 선택과 차원 축소 전략 비교",
        "분류 모델 학습과 교차검증"
      ],
      validation:
        "검증 데이터 성능을 기준으로 전처리와 모델 조합을 비교했습니다.",
      result:
        "940팀 중 29위로 은상을 수상했습니다.",
      limitation:
        "대회 데이터 성능을 실제 임상적 유용성으로 해석하기 위해서는 외부 코호트 검증이 필요합니다.",
      links: []
    },
    {
      id: "khd",
      title: "KHD 의료 데이터 분석",
      subtitle: "수면장애 분류 문제의 재정의와 모델링",
      period: "2025.06 — 2025.08",
      track: "bio",
      status: "우수상",
      media: null,
      summary:
        "수면장애 분류 문제를 치료 기준과 연결해 다시 정의하고, 의료 데이터에 맞는 분류 모델을 구축했습니다.",
      problem:
        "단순한 분류 정확도만으로는 실제 치료 기준과 연결되는 결과를 만들기 어려웠습니다.",
      role:
        "임상적 문제 정의, 변수 검토, 모델링과 결과 해석을 수행했습니다.",
      process: [
        "치료 기준을 반영한 목표 변수 재정의",
        "의료 변수 전처리와 특징 검토",
        "분류 모델 비교와 오류 사례 분석"
      ],
      validation:
        "전체 정확도와 함께 분류별 오류와 치료 기준에 따른 결과 차이를 확인했습니다.",
      result:
        "26팀 중 5위로 우수상을 수상했습니다.",
      limitation:
        "단일 대회 데이터 결과로, 다른 환자군에서도 같은 기준이 유지되는지 외부 검증이 필요합니다.",
      links: []
    }
  ],
  timeline: [
    { date: "2024.08", title: "디지털 바이오 데이터 분석", note: "유전체 변이 기반 암종 분류 모델 개발 · 은상", track: "bio" },
    { date: "2024.11", title: "취업박람회 부스 배치 최적화", note: "방문 동선을 고려한 부스 배치 개선 · 최우수상", track: "analytics" },
    { date: "2025.01", title: "LH 지식산업센터 공실률 분석", note: "입지와 비용 요인을 활용한 공실 위험 분석 · 장려상", track: "analytics" },
    { date: "2025.05", title: "와인연구소 통계 자문", note: "산업체 데이터를 활용한 품질 분류 모델 개발", track: "bio" },
    { date: "2025.06", title: "요양 방치 위험 분석", note: "지역별 위험 수준 추정과 정책 대안 제시", track: "analytics" },
    { date: "2025.06", title: "KHD 의료 데이터 분석", note: "수면장애 분류 모델 개발 · 우수상", track: "bio" },
    { date: "2025.09", title: "공공체육시설 입지 분석", note: "시설 접근성을 고려한 최적 입지 선정 · 우수상", track: "analytics" },
    { date: "2025.11", title: "TVspline", note: "스플라인 R 패키지 제작 및 관리", track: "analytics" },
    { date: "2026.01", title: "결측치 대치 방법론 연구", note: "예측 성능과 통계적 추론의 신뢰성 비교", track: "bio" },
    { date: "2026.03", title: "JOBIS", note: "공공조달 공고 적격성 판정 서비스 설계 및 구축", track: "agent" },
    { date: "2026.03", title: "AutoResearch", note: "실험 결과와 분석 지식을 재사용하는 연구 자동화 구조 설계", track: "agent" },
    { date: "2026.03", title: "ILR Polygram", note: "조성자료를 위한 로지스틱 회귀 방법론 연구", track: "bio" },
    { date: "2026.03", title: "WorldQuant", note: "퀀트 모델링과 알파 검증 방법 학습", track: "agent" },
    { date: "2026.06", title: "자동투자 포트폴리오", note: "백테스트, 위험 관리와 주문 계획을 연결한 투자 시스템 구축", track: "agent" }
  ],
  otherProjects: [
    {
      title: "TVspline R 패키지",
      period: "2025.11 — 2026.05",
      category: "Research Software",
      result: "6개 논문에 흩어진 분석 함수와 호출 관계를 정리해 하나의 일관된 R 패키지로 통합했습니다.",
      links: [
        { label: "GitHub", href: "https://github.com/kiwibirdstrike/TVspline" }
      ]
    },
    {
      title: "연구실 미팅룸 예약 PWA",
      period: "2026.02 — 2026.04",
      category: "Workflow",
      result: "수기 예약을 PWA와 Google Calendar 기반 공용 예약·충돌 방지 절차로 전환했습니다.",
      links: [
        { label: "GitHub", href: "https://github.com/kiwibirdstrike/lab-rooms-pwa" }
      ]
    },
    {
      title: "언론 통계 분석 경진대회",
      period: "2026.07",
      category: "Public Data",
      result: "청소년 뉴스 원문 접근 취약군 1,470명을 정의하고 재현 가능한 분석·보고 패키지로 완성했습니다."
    }
  ],
  credentials: [
    {
      type: "논문",
      title: "Efficient curve fitting with penalized B-splines for oceanographic and ecological applications",
      meta: "Scientific Reports · 공동저자 · 2025.07"
    },
    {
      type: "학회 발표",
      title: "ILR-Based Polygram Logistic Regression",
      meta: "IMS-APRM 2026 홍콩 · 2026 한국통계학회 하계학술대회 · 포스터 발표"
    },
    {
      type: "자격",
      title: "빅데이터분석기사 · SQLD · 사회조사분석사 2급",
      meta: "데이터 분석 및 조사 방법론"
    }
  ]
};
