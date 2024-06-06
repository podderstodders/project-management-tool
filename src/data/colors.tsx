
export const boardColors = [
  { primary: "#b50043", secondary: "#FBB03B", gradient: "linear-gradient(to right bottom, #b50043, #e8434d, #f56941, #fb8d3a, #fbb03b)", emoji: "❤️" },
  { primary: "#493271", secondary: "#516395", gradient: "linear-gradient(to right bottom, #493271, #5c4c8b, #57548f, #535c93, #516395)", emoji: "🔮" },
  { primary: "#007837", secondary: "#FCEE21", gradient: "linear-gradient(to right bottom, #007837, #50ac3f, #86c435, #bfda28, #fcee21)", emoji: "🌲" },
  { primary: "#b28ed9", secondary: "#1EAE98", gradient: "linear-gradient(to right bottom, #b28ed9, #90baff, #32bcf2, #00b8ca, #1eae98)", emoji: "💜" },
  { primary: "#0035cc", secondary: "#92EFFD", gradient: "linear-gradient(to right bottom, #0035cc, #0093ff, #00b7ff, #20d5ff, #92effd)", emoji: "🍂" },
  { primary: "#7647a3", secondary: "#E4EfE9", gradient: "linear-gradient(to right bottom, #7647a3, #7a8389, #6f787d, #646c70, #596164)", emoji: "🔵" },
  { primary: "#99c07a", secondary: "#6FD6FF", gradient: "linear-gradient(to right bottom, #99c07a, #8cf0b8, #61ebd9, #53e2f2, #6fd6ff)", emoji: "🍃" },
  { primary: "#cc4a57", secondary: "#FFC371", gradient: "linear-gradient(to right bottom, #cc4a57, #ff7a65, #ff9362, #ffac66, #ffc371)", emoji: "🌹" },
  { primary: "#87c1b3", secondary: "#FFBBBB", gradient: "linear-gradient(to right bottom, #87c1b3, #c4e7bb, #e2d8a6, #f9c8a7, #ffbbbb)", emoji: "🌸" },
  { primary: "#a3c275", secondary: "#FE90AF", gradient: "linear-gradient(to right bottom, #a3c275, #ebd176, #ffb77a, #ff9f90, #fe90af)", emoji: "🌷" },
  { primary: "#00007d", secondary: "#1BFFFF", gradient: "linear-gradient(to right bottom, #00007d, #0068c7, #009ce8, #00cff9, #1bffff)", emoji: "🌌" },
  { primary: "#008698", secondary: "#00CDAC", gradient: "linear-gradient(to right bottom, #008698, #00b3bd, #00bcba, #00c5b4, #00cdac)", emoji: "🌊" },
  { primary: "#bf7272", secondary: "#A890FE", gradient: "linear-gradient(to right bottom, #bf7272, #ef85a3, #e981bf, #d485df, #a890fe)", emoji: "🌺" },
  { primary: "#ccbba8", secondary: "#FCB69F", gradient: "linear-gradient(to right bottom, #ccbba8, #fddfc2, #fdd2b4, #fcc4a8, #fcb69f)", emoji: "🍂" },
  { primary: "#81a0cc", secondary: "#C2E9FB", gradient: "linear-gradient(to right bottom, #81a0cc, #a3cefe, #aad8fd, #b5e1fc, #c2e9fb)", emoji: "💧" },
  { primary: "#007a70", secondary: "#38EF7D", gradient: "linear-gradient(to right bottom, #007a70, #00af94, #00c593, #00da8b, #38ef7d)", emoji: "🌿" },
  { primary: "#4d3a84", secondary: "#667EEA", gradient: "linear-gradient(to right bottom, #4d3a84, #7657b4, #7364c6, #6e71d8, #667eea)", emoji: "💙" },
  { primary: "#9e1c4b", secondary: "#1D2671", gradient: "linear-gradient(to right bottom, #9e1c4b, #a62a6f, #822675, #572676, #1d2671)", emoji: "💗" },
  { primary: "#cc3ca8", secondary: "#FE9090", gradient: "linear-gradient(to right bottom, #cc3ca8, #ff68ba, #ff74a7, #ff8298, #fe9090)", emoji: "💖" },
  { primary: "#000033", secondary: "#537895", gradient: "linear-gradient(to right bottom, #000033, #1b3454, #2d4a69, #3f607f, #537895)", emoji: "🔷" },
  { primary: "#cc3d0f", secondary: "#DD2476", gradient: "linear-gradient(to right bottom, #cc3d0f, #fc3f44, #f53056, #eb2667, #dd2476)", emoji: "❤️‍🔥" },
  { primary: "#bf7b86", secondary: "#FFDDE1", gradient: "linear-gradient(to right bottom, #bf7b86, #f3acb5, #f7bdc4, #fbcdd2, #ffdde1)", emoji: "🌼" },
  { primary: "#4d166f", secondary: "#ED1E79", gradient: "linear-gradient(to right bottom, #4d166f, #8c288e, #b0218c, #d01b84, #ed1e79)", emoji: "💜" },
  { primary: "#ccc8c8", secondary: "#E2D1C3", gradient: "linear-gradient(to right bottom, #ccc8c8, #f6f1ed, #efe6df, #e9dcd1, #e2d1c3)", emoji: "🤍" }
];

type colorProps = {
  primary: string
  secondary: string 
  gradient: string 
  emoji: string
}

export const categorizedColors: Record<string, colorProps[]> = {
  'crips': [
    { primary: "#00007d", secondary: "#1BFFFF", gradient: "linear-gradient(to right bottom, #00007d, #0068c7, #009ce8, #00cff9, #1bffff)", emoji: "🌌" },
    { primary: "#493271", secondary: "#516395", gradient: "linear-gradient(to right bottom, #493271, #5c4c8b, #57548f, #535c93, #516395)", emoji: "🔮" },
    { primary: "#0035cc", secondary: "#92EFFD", gradient: "linear-gradient(to right bottom, #0035cc, #0093ff, #00b7ff, #20d5ff, #92effd)", emoji: "🌌" },
    { primary: "#81a0cc", secondary: "#C2E9FB", gradient: "linear-gradient(to right bottom, #81a0cc, #a3cefe, #aad8fd, #b5e1fc, #c2e9fb)", emoji: "💧" },
    { primary: "#4d3a84", secondary: "#667EEA", gradient: "linear-gradient(to right bottom, #4d3a84, #7657b4, #7364c6, #6e71d8, #667eea)", emoji: "🔵" },
    { primary: "#b28ed9", secondary: "#1EAE98", gradient: "linear-gradient(to right bottom, #b28ed9, #90baff, #32bcf2, #00b8ca, #1eae98)", emoji: "💜" }
  ],
  'bloods': [
    { primary: "#b50043", secondary: "#FBB03B", gradient: "linear-gradient(to right bottom, #b50043, #e8434d, #f56941, #fb8d3a, #fbb03b)", emoji: "🔥" },
    { primary: "#cc4a57", secondary: "#FFC371", gradient: "linear-gradient(to right bottom, #cc4a57, #ff7a65, #ff9362, #ffac66, #ffc371)", emoji: "🌺" },
    { primary: "#bf7272", secondary: "#A890FE", gradient: "linear-gradient(to right bottom, #bf7272, #ef85a3, #e981bf, #d485df, #a890fe)", emoji: "🌺" },
    { primary: "#cc3ca8", secondary: "#FE9090", gradient: "linear-gradient(to right bottom, #cc3ca8, #ff68ba, #ff74a7, #ff8298, #fe9090)", emoji: "🌸" },
    { primary: "#9e1c4b", secondary: "#1D2671", gradient: "linear-gradient(to right bottom, #9e1c4b, #a62a6f, #822675, #572676, #1d2671)", emoji: "💗" },
    { primary: "#cc3d0f", secondary: "#DD2476", gradient: "linear-gradient(to right bottom, #cc3d0f, #fc3f44, #f53056, #eb2667, #dd2476)", emoji: "❤️‍🔥" }
  ],
  'dragons': [
    { primary: "#007837", secondary: "#FCEE21", gradient: "linear-gradient(to right bottom, #007837, #50ac3f, #86c435, #bfda28, #fcee21)", emoji: "🌲" },
    { primary: "#99c07a", secondary: "#6FD6FF", gradient: "linear-gradient(to right bottom, #99c07a, #8cf0b8, #61ebd9, #53e2f2, #6fd6ff)", emoji: "🌿" },
    { primary: "#008698", secondary: "#00CDAC", gradient: "linear-gradient(to right bottom, #008698, #00b3bd, #00bcba, #00c5b4, #00cdac)", emoji: "🐬" },
    { primary: "#007a70", secondary: "#38EF7D", gradient: "linear-gradient(to right bottom, #007a70, #00af94, #00c593, #00da8b, #38ef7d)", emoji: "🍀" },
    { primary: "#a3c275", secondary: "#FE90AF", gradient: "linear-gradient(to right bottom, #a3c275, #ebd176, #ffb77a, #ff9f90, #fe90af)", emoji: "🌸" },
    { primary: "#87c1b3", secondary: "#FFBBBB", gradient: "linear-gradient(to right bottom, #87c1b3, #c4e7bb, #e2d8a6, #f9c8a7, #ffbbbb)", emoji: "🦩" } // Added to complete the category
  ],
  'others': [
    { primary: "#ccbba8", secondary: "#FCB69F", gradient: "linear-gradient(to right bottom, #ccbba8, #fddfc2, #fdd2b4, #fcc4a8, #fcb69f)", emoji: "🍁" },
    { primary: "#bf7b86", secondary: "#FFDDE1", gradient: "linear-gradient(to right bottom, #bf7b86, #f3acb5, #f7bdc4, #fbcdd2, #ffdde1)", emoji: "🌼" },
    { primary: "#7647a3", secondary: "#E4EfE9", gradient: "linear-gradient(to right bottom, #7647a3, #7a8389, #6f787d, #646c70, #596164)", emoji: "🔮" },
    { primary: "#000033", secondary: "#537895", gradient: "linear-gradient(to right bottom, #000033, #1b3454, #2d4a69, #3f607f, #537895)", emoji: "💙" },
    { primary: "#4d166f", secondary: "#ED1E79", gradient: "linear-gradient(to right bottom, #4d166f, #8c288e, #b0218c, #d01b84, #ed1e79)", emoji: "💜" },
    { primary: "#ccc8c8", secondary: "#E2D1C3", gradient: "linear-gradient(to right bottom, #ccc8c8, #f6f1ed, #efe6df, #e9dcd1, #e2d1c3)", emoji: "🤍" }
  ]
}

