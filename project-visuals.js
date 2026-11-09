// Sources point to the reviewed fields of the same project in portfolio-content.js.
window.PROJECT_VISUALS = {
  "port-matching": [{
  "type": "image",
  "placement": "approach",
  "replacesWorkflow": true,
  "title": "표기가 다른 기록을 같은 선박으로 연결",
  "sources": [
    "process"
  ],
  "src": "./assets/projects/port-model.svg",
  "width": 604,
  "height": 716,
  "alt": "한글·비한글 후보 검색과 각각의 Cross-Encoder, 조건부 후보 복구 및 비한글 추가 리랭커로 이어지는 실제 추론 구조.",
  "credit": "최종 제출 코드의 후보 검색·CE·리랭커 흐름을 바탕으로 재구성",
  "caption": "CE는 기록과 후보의 이름·국적·선종·톤수 문맥을 함께 비교하는 Cross-Encoder입니다. 학습에서는 입력 노이즈를 섞고, 추론은 기록별 후보 묶음으로 처리했습니다."
}],
  "eumseong-fire": [{
    type: "image", placement: "approach", replacesWorkflow: true, title: "날씨를 보정해도 남는 계절 차이", sources: ["process", "result"],
    src: "./assets/projects/fire-season-adjustment.png", width: 2268, height: 1212,
    alt: "가을 대비 일별 화재 발생 배율. 봄은 날씨 보정 전 1.67배에서 보정 후 1.48배, 여름은 1.24배에서 1.47배, 겨울은 1.44배에서 1.14배입니다.",
    credit: "1차 화재 위험요인 분석보고서 · 계절 효과",
    caption: "봄철 화재가 많은 현상을 날씨 차이만으로 설명할 수 있는지 확인했습니다. 보정 후에도 가을 대비 1.48배의 발생률이 남았습니다."
  }, {
    type: "image", placement: "outcome", title: "담당자 피드백 후, 화학적 요인으로 분석 범위 축소", sources: ["process", "result"],
    src: "./assets/projects/fire-causes.png", width: 1672, height: 1100,
    alt: "공장 수로 보정한 음성군 공장화재 발생 배율. 전체 1.2배, 화학적 요인 3.8배, 자연발화 4.5배, 유증기 확산 4.4배입니다.",
    credit: "후속 화학적 요인 공장화재 분석보고서 · 전국 비교 2016–2024",
    caption: "공장화재 전체는 기대 수준에 가까웠지만 화학적 요인은 3.8배였습니다. 이 그림의 62건은 전국 비교 기간의 값이며, 2016.7–2026.6 상세 조사에서의 68건과 집계 기간이 다릅니다."
  }, {
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
  "type": "image",
  "placement": "approach",
  "replacesWorkflow": true,
  "title": "공고문 파싱부터 참가자격 비교까지",
  "sources": [
    "process"
  ],
  "src": "./assets/projects/jobis-service.svg",
  "width": 429,
  "height": 1029,
  "alt": "공고문 추출, 근거 추출과 조건 구조화, 데이터 저장, 기업 프로필 비교 및 사용자 화면을 연결한 구조.",
  "credit": "파서·판정 서비스 구현과 검수한 개발 기록을 바탕으로 재구성",
  "caption": "원문에서 판단 근거를 찾는 일과 참가 조건을 구조화하는 일을 나눴습니다. 구조화한 조건은 기업 정보와 비교하고, 결과를 서비스 화면에 전달합니다."
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
    type: "image", placement: "approach", replacesWorkflow: true,
    title: "서로 다른 학습 목표를 성공 확률로 연결", sources: ["process"],
    src: "./assets/projects/lg-loss-model.svg", width: 634, height: 817,
    alt: "공통 피처에서 제곱오차로 학습하는 기존 성공 확률 경로와 4클래스 교차엔트로피 경로로 나뉘고, 각각의 성공 확률을 결합하는 모델 구조.",
    credit: "학습 코드의 손실함수와 출력 구조를 바탕으로 재구성",
    caption: "실패를 세 유형으로 나눠 학습한 모델의 성공 클래스 확률을 기존 모델과 결합했습니다. 두 손실을 한 번에 최적화하는 대신 각각 학습한 뒤 블렌딩한 구조입니다."
  }],
  "tvspline": [{
    "type": "image",
    "placement": "approach",
    "replacesWorkflow": true,
    "title": "단일 인터페이스 아래의 여섯 모형",
    "sources": [
        "process",
        "result"
    ],
    "src": "./assets/projects/tvspline-calls.svg",
    "width": 485,
    "height": 470,
    "alt": "사용자 입력이 tvspline 진입점을 거쳐 여섯 모형별 함수와 공통 유틸리티·Rcpp 연산으로 연결되는 주요 호출 구조.",
    "credit": "프로젝트 수행 내용을 바탕으로 재구성한 구조도",
    "caption": "실행 순서와 개발 절차를 나눠 표현했습니다. 6개 연구 모형을 사용자가 같은 방식으로 실행하고 결과를 활용할 수 있도록 구성했습니다."
}],
  "polygram": [{
    type: "image", placement: "approach", title: "국소적인 변화가 생기는 위치를 찾는 모형", sources: ["process"],
    src: "./assets/projects/polygram-simulation.png", width: 2000, height: 1010,
    alt: "SIM03 시뮬레이션: 왼쪽은 자료 생성에 사용한 실제 기울기 변화 경계, 오른쪽은 Polygram이 추정한 활성 경계. 선의 색과 굵기는 기울기 변화의 크기를 나타냅니다.",
    credit: "논문 Figure 2 · SIM03 시뮬레이션",
    caption: "왼쪽은 자료를 만들 때 설정한 기울기 변화 경계, 오른쪽은 모형이 추정한 경계입니다. 오른쪽에서 선이 진하고 굵을수록 인접 영역 사이의 기울기 변화가 큽니다."
  }, {
    type: "image", placement: "outcome", title: "시간 사용 조성과 고용 여부에 적용", sources: ["process", "result"],
    src: "./assets/projects/polygram-atus.png", width: 1600, height: 1462,
    alt: "ATUS 2022–2024 자료의 시간 사용 조성. 붉은 점은 취업자, 푸른 점은 비취업자이며, 회색과 검은 선은 모형이 추정한 국소 기울기 변화 경계입니다.",
    credit: "논문 Figure 4 · ATUS 2022–2024",
    caption: "점은 응답자의 시간 사용 비율과 고용 상태를 나타냅니다. 검은 선은 시간 사용 비율이 달라질 때 고용 확률의 변화 양상이 달라지는 위치입니다. 취업자와 비취업자를 직접 나누는 분류선은 아닙니다."
  }],
  "gcer": [
  {
    "type": "image",
    "placement": "approach",
    "replacesArchitecture": true,
    "title": "방문한 근거로 다음 문단의 순위를 갱신",
    "sources": [
      "process",
      "architectureDiagram"
    ],
    "src": "./assets/projects/gcer-search.svg",
    "width": 651,
    "height": 967,
    "alt": "질문 임베딩으로 앵커를 선택하고, 문단 그래프와 전역 후보를 결합해 관련성 및 이웃 근거 점수를 계산합니다. 선택한 문단으로 방문 집합을 갱신하는 반복 검색 구조입니다.",
    "credit": "논문의 순차 검색 알고리즘을 바탕으로 재구성",
    "caption": "점선은 학습된 계수의 적용, 되돌아가는 선은 검색 중 방문 집합의 갱신입니다. 검색 단계에서는 LLM을 호출하지 않고, 공통 LLM은 검색 결과로 답변을 평가할 때 사용합니다."
  },
  {
    "type": "table",
    "placement": "validation",
    "title": "문단 수를 고정한 근거 검색 성능",
    "sources": [
      "validation",
      "result"
    ],
    "numeric": true,
    "highlight": "GCER",
    "columns": [
      "방법",
      "Recall@5",
      "Recall@10"
    ],
    "rows": [
      [
        "Similarity",
        "66.4",
        "74.9"
      ],
      [
        "PPR",
        "66.7",
        "75.1"
      ],
      [
        "Flow diffusion",
        "59.2",
        "75.8"
      ],
      [
        "QAFD-RAG",
        "64.0",
        "75.1"
      ],
      [
        "HippoRAG 2",
        "70.3",
        "78.5"
      ],
      [
        "GNN-Ret (own graph)",
        "69.2",
        "78.7"
      ],
      [
        "GCER",
        "71.1",
        "80.3"
      ]
    ],
    "credit": "논문 Table 3 · MuSiQue 2,417문항 · 단위: %",
    "caption": "Recall은 정답 근거 중 검색한 비율, Complete는 필요한 근거를 모두 찾은 질문의 비율입니다. @5·@10은 문단 수, @1500t·@3000t는 토큰 제한을 뜻합니다."
  },
  {
    "type": "table",
    "placement": "validation",
    "title": "토큰 예산을 고정한 근거 검색 성능",
    "sources": [
      "validation",
      "result"
    ],
    "numeric": true,
    "highlight": "GCER",
    "columns": [
      "방법",
      "Recall@1500t",
      "Recall@3000t",
      "Complete@1500t",
      "Complete@3000t"
    ],
    "rows": [
      [
        "Similarity",
        "74.7",
        "81.3",
        "45.6",
        "57.5"
      ],
      [
        "PPR",
        "76.8",
        "83.6",
        "49.2",
        "62.1"
      ],
      [
        "Flow diffusion",
        "76.8",
        "84.1",
        "49.5",
        "63.5"
      ],
      [
        "QAFD-RAG",
        "75.7",
        "82.5",
        "49.0",
        "60.5"
      ],
      [
        "HippoRAG 2",
        "78.4",
        "84.1",
        "53.0",
        "63.0"
      ],
      [
        "GNN-Ret (own graph)",
        "78.6",
        "85.4",
        "52.8",
        "65.2"
      ],
      [
        "GCER",
        "80.0",
        "86.3",
        "56.2",
        "67.6"
      ]
    ],
    "credit": "논문 Table 3 · MuSiQue 2,417문항 · 단위: %",
    "caption": "Recall은 정답 근거 중 검색한 비율, Complete는 필요한 근거를 모두 찾은 질문의 비율입니다. @5·@10은 문단 수, @1500t·@3000t는 토큰 제한을 뜻합니다."
  },
  {
    "type": "table",
    "placement": "validation",
    "title": "비교 방법 대비 GCER의 차이와 95% 신뢰구간",
    "sources": [
      "validation",
      "result"
    ],
    "numeric": true,
    "columns": [
      "비교 방법",
      "Δ Recall@5",
      "Δ Recall@10",
      "Δ Recall@3000t",
      "Δ Complete@3000t"
    ],
    "rows": [
      [
        "Similarity",
        "+4.7 [3.9, 5.4]",
        "+5.4 [4.6, 6.2]",
        "+5.0 [4.4, 5.7]",
        "+10.1 [8.7, 11.6]"
      ],
      [
        "PPR",
        "+4.3 [3.6, 5.0]",
        "+5.3 [4.5, 6.0]",
        "+2.7 [2.0, 3.5]",
        "+5.4 [3.9, 7.0]"
      ],
      [
        "Flow diffusion",
        "+11.8 [10.8, 12.9]",
        "+4.5 [3.7, 5.3]",
        "+2.2 [1.5, 3.0]",
        "+4.0 [2.4, 5.7]"
      ],
      [
        "QAFD-RAG",
        "+7.0 [6.0, 8.0]",
        "+5.2 [4.4, 6.1]",
        "+3.8 [3.1, 4.6]",
        "+7.1 [5.5, 8.6]"
      ],
      [
        "HippoRAG 2",
        "+0.8 [0.1, 1.5]",
        "+1.8 [1.1, 2.6]",
        "+2.2 [1.6, 2.9]",
        "+4.6 [3.3, 6.0]"
      ],
      [
        "GNN-Ret (own graph)",
        "+1.8 [1.2, 2.4]",
        "+1.6 [1.0, 2.3]",
        "+0.9 [0.4, 1.5]",
        "+2.3 [1.2, 3.6]"
      ]
    ],
    "credit": "논문 Table 4 · 단위: %p · 질문 단위 짝지은 부트스트랩",
    "caption": "양수는 GCER의 값이 더 높다는 뜻입니다. 차이와 구간은 논문 값을 그대로 옮겼습니다. 반올림된 앞 표의 값을 빼면 일부 차이가 다를 수 있습니다."
  },
  {
    "type": "table",
    "placement": "validation",
    "title": "5개 문단으로 생성한 답변의 정확도",
    "sources": [
      "validation",
      "result",
      "limitation"
    ],
    "numeric": true,
    "highlight": "GCER",
    "columns": [
      "방법",
      "EM@5",
      "F1@5",
      "ΔF1@5 [95% CI]"
    ],
    "rows": [
      [
        "Similarity",
        "32.7",
        "44.2",
        "+5.4 [4.1, 6.7]"
      ],
      [
        "PPR",
        "33.3",
        "44.8",
        "+4.8 [3.5, 6.1]"
      ],
      [
        "Flow diffusion",
        "28.7",
        "38.9",
        "+10.6 [8.9, 12.4]"
      ],
      [
        "QAFD-RAG",
        "32.9",
        "43.8",
        "+5.8 [4.3, 7.3]"
      ],
      [
        "HippoRAG 2",
        "36.3",
        "48.0",
        "+1.6 [0.2, 3.0]"
      ],
      [
        "GNN-Ret (own graph)",
        "34.9",
        "46.9",
        "+2.6 [1.4, 3.8]"
      ],
      [
        "GCER",
        "37.9",
        "49.5",
        "—"
      ]
    ],
    "credit": "논문 Table 6 · MuSiQue 2,417문항 · 단위: %",
    "caption": "EM은 완전 일치율, F1은 답변 토큰의 일치 정도입니다. ΔF1은 GCER에서 해당 방법을 뺀 차이(%p), 대괄호는 95% 신뢰구간입니다. 3,000토큰에서는 PPR·Flow diffusion·HippoRAG 2·GNN-Ret과의 F1 차이 구간에 0이 포함됩니다."
  },
  {
    "type": "table",
    "placement": "validation",
    "title": "3,000토큰으로 생성한 답변의 정확도",
    "sources": [
      "validation",
      "result",
      "limitation"
    ],
    "numeric": true,
    "highlight": "GCER",
    "columns": [
      "방법",
      "EM@3000t",
      "F1@3000t",
      "ΔF1@3000t [95% CI]"
    ],
    "rows": [
      [
        "Similarity",
        "39.4",
        "51.8",
        "+2.0 [0.6, 3.4]"
      ],
      [
        "PPR",
        "39.4",
        "52.5",
        "+1.3 [−0.03, 2.7]"
      ],
      [
        "Flow diffusion",
        "40.5",
        "53.1",
        "+0.7 [−0.7, 2.1]"
      ],
      [
        "QAFD-RAG",
        "39.3",
        "51.8",
        "+2.1 [0.5, 3.5]"
      ],
      [
        "HippoRAG 2",
        "40.3",
        "52.7",
        "+1.1 [−0.3, 2.5]"
      ],
      [
        "GNN-Ret (own graph)",
        "41.6",
        "53.8",
        "+0.0 [−1.3, 1.3]"
      ],
      [
        "GCER",
        "41.0",
        "53.8",
        "—"
      ]
    ],
    "credit": "논문 Table 6 · MuSiQue 2,417문항 · 단위: %",
    "caption": "EM은 완전 일치율, F1은 답변 토큰의 일치 정도입니다. ΔF1은 GCER에서 해당 방법을 뺀 차이(%p), 대괄호는 95% 신뢰구간입니다. 3,000토큰에서는 PPR·Flow diffusion·HippoRAG 2·GNN-Ret과의 F1 차이 구간에 0이 포함됩니다."
  },
  {
    "type": "image",
    "placement": "outcome",
    "title": "검색 문단 수에 따른 근거 재현율",
    "sources": [
      "result",
      "validation"
    ],
    "src": "./assets/projects/gcer-recall-passages.png",
    "width": 2000,
    "height": 874,
    "alt": "검색 문단 수 1~30개에 따른 Similarity 대비 근거 재현율 차이. GCER는 검은 실선이며, 첫 세 문단은 유사도 기반 앵커입니다.",
    "credit": "논문 Figure 1(a)",
    "caption": "세로축은 재현율 자체가 아니라 Similarity 검색 대비 차이(%p)입니다. 검은 선이 GCER이며, 처음 세 문단은 질문과 가장 유사한 앵커입니다."
  },
  {
    "type": "image",
    "placement": "outcome",
    "title": "토큰 제한에 따른 완전 근거율",
    "sources": [
      "result",
      "limitation"
    ],
    "src": "./assets/projects/gcer-complete-budget.png",
    "width": 2000,
    "height": 778,
    "alt": "토큰 예산 0~5,000에서 Similarity 대비 완전 근거율 차이. GCER는 검은 실선, GNN-Ret은 주황 실선, HippoRAG 2는 파란 실선입니다.",
    "credit": "논문 Figure 1(c) · 선의 범례는 위 그림과 동일",
    "caption": "세로축은 Similarity 대비 차이(%p)입니다. GCER는 500~4,200토큰에서 가장 높고, 4,400토큰부터는 GNN-Ret이 0.5%p 미만의 차이로 앞섭니다."
  }
],
  "booth-layout": [{
    type: "image", placement: "approach", replacesWorkflow: true,
    title: "인기도 예측에서 배치안 비교까지", sources: ["process", "result"],
    src: "./assets/projects/booth-optimization.svg", width: 347, height: 543,
    alt: "기업별 인기도 예측으로 부스 가중치를 정하고, 그래프 최적화로 구한 배치안과 기존 배치안을 시뮬레이션으로 비교하는 구조.",
    credit: "프로젝트 기록을 바탕으로 재구성한 분석 구조",
    caption: "인기도 예측을 배치 의사결정의 입력으로 사용했습니다. 아래 비교는 기록된 방문도 향상률을 같은 기준으로 환산한 값입니다."
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
    "type": "image",
    "placement": "approach",
    "replacesWorkflow": true,
    "title": "분류 기준의 불일치에서 두 단계 모델로",
    "sources": [
        "process",
        "result"
    ],
    "src": "./assets/projects/wine-model.svg",
    "width": 569,
    "height": 482,
    "alt": "Sweetness를 중간 목표로 선택해 단맛 예측과 Decision Tree의 DSM 분류를 연결한 구조.",
    "credit": "프로젝트 수행 내용을 바탕으로 재구성한 구조도",
    "caption": "응답자마다 DSM 분류 기준이 달라, 일관된 패턴을 보인 sweetness를 먼저 예측한 뒤 분류했습니다."
}],
  "weather-study": [{
    type: "table", placement: "approach", title: "학습 참여를 바꾸기 위한 팀 운영 설계", sources: ["problem", "process", "result"],
    columns: ["운영 방식", "구성원이 하는 일", "운영자의 역할"],
    rows: [["학습자료 제공", "자료를 받아 개별 학습", "공부자료 제작 · 학습이 이어지는지 확인"], ["발표형 세미나", "공부한 내용을 준비해 발표", "발표와 결과 공유 중심으로 모임 운영"], ["실제 데이터 분석", "공모전에서 분석하고 결과 제출", "119 신고·열 수요·지하철 혼잡도 분석으로 연결"]],
    caption: "운영 방식을 바꾼 뒤 발표 준비를 통한 학습과 실제 분석으로 이어졌습니다. 119 신고와 지하철 혼잡도 두 부문에서 입선했습니다."
  }],
  "khd": [{
    "type": "image",
    "placement": "approach",
    "replacesWorkflow": true,
    "title": "신호 특징 추출과 장애 선별 모델",
    "sources": [
        "process",
        "result"
    ],
    "src": "./assets/projects/sleep-screening.svg",
    "width": 378,
    "height": 587,
    "alt": "EDF 신호의 균등 샘플링, 웨이블릿 특징 추출, Random Forest 분류와 장애 유형·유무의 평가 구조.",
    "credit": "프로젝트 수행 내용을 바탕으로 재구성한 구조도",
    "caption": "준비한 Docker 환경이 현장에서 작동하지 않아, 필요한 분석 함수를 직접 정의해 사용했습니다."
}, {
    type: "bars", placement: "outcome", title: "대회 평가에서 확인한 두 분류 과제의 정확도", sources: ["result"], unit: "%", max: 100,
    rows: [{ label: "수면 장애 유형 구분", value: 69, display: "69%", evidence: "69%" }, { label: "수면 장애 존재 여부", value: 97, display: "97%", evidence: "97%" }],
    caption: "분류 대상이 다른 두 과제의 결과입니다. 유형 구분과 장애 유무 선별을 구분해 모델의 역할을 해석했습니다."
  }],
  "care-demand": [{
    "type": "image",
    "placement": "approach",
    "replacesWorkflow": true,
    "title": "수요와 재가·시설 인력 예측의 결합",
    "sources": [
        "process",
        "result"
    ],
    "src": "./assets/projects/care-demand.svg",
    "width": 684,
    "height": 592,
    "alt": "ETS로 수요와 인력을 예측하고 Bottom-up으로 집계해 지역별 요양 방치 지수를 비교한 구조.",
    "credit": "프로젝트 수행 내용을 바탕으로 재구성한 구조도",
    "caption": "짧은 연 단위 자료의 조건에 맞춰 예측 방법을 선택하고, 인력 구성과 의료 접근성까지 비교했습니다."
}, {
    type: "bars", placement: "outcome", title: "위험·안전 지역의 재가 요양보호사 비중", sources: ["result"], unit: "%", max: 100,
    rows: [{ label: "위험 지역", value: 96.8, display: "96.8%", evidence: "96.8%" }, { label: "안전 지역", value: 68.5, display: "68.5%", evidence: "68.5%" }],
    caption: "각 집단의 요양보호사 중 재가 인력 비중입니다. 인력의 총규모뿐 아니라 재가·시설 구성과 의료 접근성을 함께 검토했습니다."
  }],
  "sports-location": [{
    "type": "image",
    "placement": "approach",
    "replacesWorkflow": true,
    "title": "예산을 바꿔가며 비교하는 입지 최적화",
    "sources": [
        "process"
    ],
    "src": "./assets/projects/sports-location.svg",
    "width": 538,
    "height": 539,
    "alt": "수요 변화와 기존 시설 접근성, 예산 제약을 MCLP에 입력하고 웹 도구에서 결과를 비교하는 구조.",
    "credit": "프로젝트 수행 내용을 바탕으로 재구성한 구조도",
    "caption": "Trend Filtering으로 수요 변화를 반영하고, MCLP로 예산 조건별 입지 대안을 구했습니다."
}],
  "kamp": [{
    "type": "image",
    "placement": "approach",
    "replacesWorkflow": true,
    "title": "센서 분석 결과를 현장 설명으로 연결",
    "sources": [
        "process"
    ],
    "src": "./assets/projects/manufacturing-tool.svg",
    "width": 433,
    "height": 600,
    "alt": "센서 데이터와 공정 담당자의 설명을 전처리에 반영하고, 예측 결과를 LangChain과 GPT API의 설명 기능 및 웹 화면으로 전달하는 구조.",
    "credit": "프로젝트 수행 내용을 바탕으로 재구성한 구조도",
    "caption": "분석 결과와 현장 담당자가 이해하는 설명을 같은 화면에서 확인하도록 구성했습니다."
}],
  "english-survey": [{
    type: "table", placement: "outcome", title: "설문 해석에 필요한 질문과 분석 근거", sources: ["process", "result"],
    columns: ["확인할 질문", "사용한 분석", "담당자에게 설명한 내용"],
    rows: [["문항들이 무엇을 측정하는가?", "요인분석", "만족도·학습 효과·난이도 관련 문항의 요인 구조"], ["같은 개념을 일관되게 측정하는가?", "Cronbach’s α · McDonald’s ω", "문항의 내적 일관성"], ["레벨별 응답은 어떻게 다른가?", "레벨별 만족도 비교", "레벨반 운영을 검토할 차이와 해석"]],
    caption: "설문 집계에 앞서 측정 구조와 신뢰도를 검토하고, 레벨반 운영에 필요한 해석을 담당자에게 전달했습니다."
  }],
  "lab-rooms": [{
  "type": "image",
  "placement": "approach",
  "replacesWorkflow": true,
  "title": "모바일 예약 화면과 Google Calendar의 연결",
  "sources": [
    "process"
  ],
  "src": "./assets/projects/lab-rooms-system.svg",
  "width": 629,
  "height": 635,
  "alt": "PWA에서 예약 요청을 받아 Pages Functions가 PIN과 예약 조건을 확인하고 Google Calendar 일정을 읽거나 변경하는 구조.",
  "credit": "예약·조회·취소 API 구현을 바탕으로 재구성",
  "caption": "매주 종이 시간표를 출력하던 일을 모바일 예약으로 바꿨습니다. 일정 저장에는 Google Calendar를 활용해 졸업 이후의 별도 서버 관리 부담을 줄였습니다."
}],
  "autoresearch": [{
  "type": "image",
  "placement": "approach",
  "replacesWorkflow": true,
  "title": "지식그래프 검색과 실험 하네스의 연결",
  "sources": [
    "process"
  ],
  "src": "./assets/projects/autoresearch-harness.svg",
  "width": 368,
  "height": 794,
  "alt": "문서 본문 및 위키링크·역링크 검색 결과와 이전 실험 기록을 컨텍스트로 구성하고 실행·결과 기록을 반복하는 구조.",
  "credit": "지식 검색 모듈과 실험 루프 구현을 바탕으로 재구성",
  "caption": "지식그래프는 가설의 근거를 찾는 데 사용하고, 하네스는 허용된 실험 도구를 실행해 결과와 실패를 기록합니다. 기록은 다음 실험의 입력으로 돌아갑니다."
}, {
    type: "table", placement: "outcome", title: "같은 실험 하네스를 적용한 두 과제", sources: ["result"],
    columns: ["과제", "데이터·문제", "결과"],
    rows: [["구조물 안정성", "비전 기반 물리 추론", "484팀 중 37위"], ["스마트 창고", "정형 시계열 회귀", "607팀 중 72위"]],
    caption: "대회와 평가 기준이 달라 순위를 성능 지표처럼 직접 비교하지 않습니다. 서로 다른 문제에 같은 실험·기록 구조를 적용한 사례입니다."
  }],
  "worldquant": [{
    type: "table", placement: "outcome", title: "같은 알파 계열의 실험 결과 비교", sources: ["process", "result"], numeric: true,
    columns: ["실험", "Sharpe", "Fitness", "Returns", "Drawdown"],
    rows: [["A413 · 기존 후보", "1.63", "1.60", "12.73%", "7.67%"], ["A420 · 확인 조건 수정", "1.73", "1.74", "12.67%", "9.00%"], ["A422 · 가격 조건 추가", "0.38", "0.20", "3.68%", "14.66%"]],
    credit: "2026.05.14 연구 기록 · WorldQuant BRAIN · Delay 1 · IS 시뮬레이션",
    caption: "A420은 Sharpe와 Fitness가 높아졌지만 낙폭도 커졌습니다. 가격 조건을 더한 A422는 성과가 악화됐습니다. 기록된 시뮬레이션 값이며 실거래 수익이나 미사용 기간의 검증 결과가 아닙니다."
  }, {
    type: "table", placement: "approach", title: "알파 후보를 선택할 때 함께 본 기준", sources: ["process", "result"],
    columns: ["검토 대상", "지표·방법", "확인하려던 문제"],
    rows: [["위험 대비 성과", "Sharpe · drawdown", "수익률만 높고 위험은 큰 신호인지"], ["거래 부담", "turnover · 거래비용", "매매 빈도가 실제 효율을 낮추는지"], ["거래 효율", "fitness · margin", "수익성과 거래 효율의 균형"], ["중복·과적합", "alpha correlation · 기간별 비교", "유사 신호 중복과 특정 기간에 대한 과적합"]],
    caption: "수익률 하나로 후보를 고르지 않고 위험, 거래 부담, 신호 중복과 기간별 안정성을 함께 검토했습니다."
  }],
  "media-trust": [{
    type: "image", placement: "approach", title: "많이 이용하는 경로와 신뢰하는 경로의 차이", sources: ["process", "result"],
    src: "./assets/projects/media-use-trust.png", width: 1512, height: 864,
    alt: "뉴스 경로별 이용률과 5점 척도 신뢰도의 산점도. SNS·온라인 동영상·메신저는 이용률이 50% 이상이지만 평균 신뢰도는 3.2점 미만입니다.",
    credit: "언론통계 공모전 제출 보고서 · 뉴스 이용률과 신뢰도",
    caption: "동영상·SNS·메신저는 많이 이용하지만 신뢰도는 상대적으로 낮았습니다. 이 경로를 피하도록 권하기보다, 소비 화면에서 원문 출처를 확인하도록 돕는 방안을 제안했습니다."
  }, {
    type: "composition", placement: "outcome", title: "출처 확인 지원의 우선 적용 대상으로 분류한 청소년", sources: ["process", "result"],
    total: 2674, selected: 1470, selectedLabel: "우선 적용군", otherLabel: "그 외 응답자",
    conditions: ["5개 정보 경로 중 3개 이상에 이용·접촉 응답", "뉴스 사이트·언론사 직접접속 이용 응답 없음"],
    caption: "전체 2,674명 중 1,470명으로 55.0%입니다. 직접접속 응답이 없다는 사실을 원문 기사를 전혀 읽지 않는다는 뜻으로 해석하지 않았습니다."
  }]
};
