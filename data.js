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
        alt: "JOBIS 공공조달 공고 탐색 서비스 화면"
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
      links: [
        {
          label: "대회",
          href: "https://dacon.io/competitions/official/236686/overview/description"
        }
      ]
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
      status: "논문 보완 중",
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
        "IMS-APRM 2026과 한국통계학회에서 동일 연구를 포스터 발표했으며, 현재 논문을 보완 중입니다.",
      limitation:
        "아직 게재 전 연구로, 주장 범위와 재현 파이프라인을 추가 점검하고 있습니다.",
      links: []
    }
  ],
  timeline: [
    { date: "2024.08", title: "디지털 바이오 데이터분석", note: "940팀 중 29위 · 은상", track: "bio" },
    { date: "2024.11", title: "취업박람회 부스 배치 최적화", note: "방문도 18% 개선 · 최우수상", track: "analytics" },
    { date: "2025.01", title: "LH 공실률 분석", note: "71팀 중 3위 · 장려상", track: "analytics" },
    { date: "2025.05", title: "와인연구소 통계 자문", note: "산업체 요구 기반 분류 모델", track: "bio" },
    { date: "2025.06", title: "통계청 요양 방치 위험 분석", note: "계층적 시계열 · 정책 제안", track: "analytics" },
    { date: "2025.06", title: "KHD 의료 데이터 대회", note: "26팀 중 5위 · 우수상", track: "bio" },
    { date: "2025.09", title: "공공체육시설 입지 시뮬레이션", note: "MCLP · 웹 의사결정 도구", track: "analytics" },
    { date: "2025.11", title: "TVspline R 패키지", note: "6개 연구 코드 통합 · R CMD check 통과", track: "analytics" },
    { date: "2026.01", title: "Imputation 연구", note: "예측과 통계 추론 동시 평가", track: "bio" },
    { date: "2026.03", title: "JOBIS · AutoResearch", note: "에이전트 기반 업무 구조화", track: "agent" },
    { date: "2026.03", title: "Polygram · WorldQuant", note: "방법론 연구와 퀀트 모델링 확장", track: "agent" },
    { date: "2026.06", title: "자동투자 포트폴리오", note: "검증·계좌·주문 계획 연결", track: "agent" }
  ],
  otherProjects: [
    {
      title: "TVspline R 패키지",
      period: "2025.11 — 2026.05",
      category: "Research Software",
      result: "6개 논문의 분석 코드를 단일 인터페이스와 S3 메서드로 통합하고 패키지 검사 0 ERROR, 0 WARNING을 확인했습니다."
    },
    {
      title: "디지털 바이오 데이터분석",
      period: "2024.08 — 2024.10",
      category: "Bio AI",
      result: "유전체 변이 기반 암종 분류에서 940팀 중 29위로 은상을 수상했습니다."
    },
    {
      title: "Konyang Health Datathon",
      period: "2025.06 — 2025.08",
      category: "Medical Data",
      result: "수면 장애 분류 문제를 치료 기준으로 재정의해 26팀 중 5위, 우수상을 수상했습니다."
    },
    {
      title: "알츠하이머 후보물질 발굴",
      period: "학과 협업 프로젝트",
      category: "Drug Discovery",
      result: "통계적 유의성과 생물학적 타당성을 교차 검토해 후보물질을 단계적으로 축소했습니다."
    },
    {
      title: "LH 지식산업센터 공실률 분석",
      period: "2025.01 — 2025.02",
      category: "Decision Analytics",
      result: "XGBoost와 SHAP으로 입지·비용 상충관계를 해석해 71팀 중 3위로 장려상을 수상했습니다."
    },
    {
      title: "공공체육시설 입지 시뮬레이션",
      period: "2025.09 — 2025.11",
      category: "Optimization",
      result: "MCLP와 Trend Filtering을 결합한 정책 웹 도구로 우수상을 수상했습니다."
    },
    {
      title: "연구실 미팅룸 예약 PWA",
      period: "2026.02 — 2026.04",
      category: "Workflow",
      result: "수기 예약을 PWA와 Google Calendar 기반 공용 예약·충돌 방지 절차로 전환했습니다."
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
      type: "국제학회",
      title: "ILR-Based Polygram Logistic Regression",
      meta: "IMS-APRM 2026 · 포스터 발표 · 홍콩"
    },
    {
      type: "학회",
      title: "ILR 기반 Polygram 로지스틱 회귀",
      meta: "2026 한국통계학회 하계학술대회 · 포스터 발표"
    },
    {
      type: "자격",
      title: "빅데이터분석기사 · SQLD · 사회조사분석사 2급",
      meta: "데이터 분석 및 조사 방법론"
    }
  ]
};
