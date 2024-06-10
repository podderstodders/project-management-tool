import { boardProps } from "../@types/board";

export const initialTrelloState = [
  {
    "boardName": "Project Alpha",
    "isFavorite": false,
    "description": "Board for Project Alpha",
    "isWatching": true,
    "lists": [
      {
        "listName": "To Do",
        "items": [
          {
            "id": 1,
            "title": "Task 1",
            "description": "Description of Task 1",
            "isWatching": false,
            "labels": [
              {
                "labelColorName": "red",
                "labelColorCode": "red",
                "labelIsChecked": true,
                "labelTitle": "Urgent",
                "labelIndex": 0
              },
              {
                "labelColorName": "green",
                "labelColorCode": "green",
                "labelIsChecked": true,
                "labelTitle": "Feature",
                "labelIndex": 1
              }
            ]
          },
          {
            "id": 2,
            "title": "Task 2",
            "description": "Description of Task 2",
            "isWatching": true,
            "labels": [
              {
                "labelColorName": "blue",
                "labelColorCode": "blue",
                "labelIsChecked": true,
                "labelTitle": "Bug",
                "labelIndex": 0
              }
            ]
          }
        ]
      },
      {
        "listName": "In Progress",
        "items": [
          {
            "id": 3,
            "title": "Task 3",
            "description": "Description of Task 3",
            "isWatching": false,
            "labels": []
          },
          {
            "id": 4,
            "title": "Task 4",
            "description": "Description of Task 4",
            "isWatching": false,
            "labels": []
          },
          {
            "id": 5,
            "title": "Task 5",
            "description": "Description of Task 5",
            "isWatching": true,
            "labels": [
              {
                "labelColorName": "yellow",
                "labelColorCode": "yellow",
                "labelIsChecked": true,
                "labelTitle": "Improvement",
                "labelIndex": 0
              }
            ]
          }
        ]
      },
      {
        "listName": "Done",
        "items": [
          {
            "id": 6,
            "title": "Task 6",
            "description": "Description of Task 6",
            "isWatching": true,
            "labels": [
              {
                "labelColorName": "purple",
                "labelColorCode": "purple",
                "labelIsChecked": true,
                "labelTitle": "Review",
                "labelIndex": 0
              }
            ]
          },
          {
            "id": 7,
            "title": "Task 7",
            "description": "Description of Task 7",
            "isWatching": false,
            "labels": []
          }
        ]
      }
    ],
    "boardColor": { primary: "#cc3d0f", secondary: "#DD2476", gradient: "linear-gradient(to right bottom, #cc3d0f, #fc3f44, #f53056, #eb2667, #dd2476)", emoji: "❤️‍🔥" },
  },
  {
    "boardName": "Project Beta",
    "isFavorite": true,
    "description": "Board for Project Beta",
    "isWatching": false,
    "lists": [
      {
        "listName": "Backlog",
        "items": [
          {
            "id": 8,
            "title": "Task 8",
            "description": "Description of Task 8",
            "isWatching": false,
            "labels": [
              {
                "labelColorName": "orange",
                "labelColorCode": "orange",
                "labelIsChecked": true,
                "labelTitle": "Low Priority",
                "labelIndex": 0
              }
            ]
          },
          {
            "id": 9,
            "title": "Task 9",
            "description": "Description of Task 9",
            "isWatching": true,
            "labels": []
          }
        ]
      },
      {
        "listName": "Development",
        "items": [
          {
            "id": 10,
            "title": "Task 10",
            "description": "Description of Task 10",
            "isWatching": true,
            "labels": [
              {
                "labelColorName": "red",
                "labelColorCode": "red",
                "labelIsChecked": true,
                "labelTitle": "High Priority",
                "labelIndex": 0
              }
            ]
          }
        ]
      }
    ],
    "boardColor": { primary: "#b50043", secondary: "#FBB03B", gradient: "linear-gradient(to right bottom, #b50043, #e8434d, #f56941, #fb8d3a, #fbb03b)", emoji: "🔥" },
  },
  {
    "boardName": "Project Gamma",
    "isFavorite": true,
    "description": "Board for Project Gamma",
    "isWatching": true,
    "lists": [
      {
        "listName": "Planning",
        "items": [
          {
            "id": 11,
            "title": "Task 11",
            "description": "Description of Task 11",
            "isWatching": false,
            "labels": [
              {
                "labelColorName": "green",
                "labelColorCode": "green",
                "labelIsChecked": true,
                "labelTitle": "Medium Priority",
                "labelIndex": 0
              }
            ]
          },
          {
            "id": 12,
            "title": "Task 12",
            "description": "Description of Task 12",
            "isWatching": false,
            "labels": []
          }
        ]
      },
      {
        "listName": "Execution",
        "items": [
          {
            "id": 13,
            "title": "Task 13",
            "description": "Description of Task 13",
            "isWatching": true,
            "labels": []
          }
        ]
      },
      {
        "listName": "Review",
        "items": [
          {
            "id": 14,
            "title": "Task 14",
            "description": "Description of Task 14",
            "isWatching": false,
            "labels": [
              {
                "labelColorName": "blue",
                "labelColorCode": "blue",
                "labelIsChecked": true,
                "labelTitle": "Low Priority",
                "labelIndex": 0
              }
            ]
          },
          {
            "id": 15,
            "title": "Task 15",
            "description": "Description of Task 15",
            "isWatching": true,
            "labels": []
          },
          {
            "id": 16,
            "title": "Task 16",
            "description": "Description of Task 16",
            "isWatching": false,
            "labels": [
              {
                "labelColorName": "yellow",
                "labelColorCode": "yellow",
                "labelIsChecked": true,
                "labelTitle": "Critical",
                "labelIndex": 0
              }
            ]
          }
        ]
      }
    ],
    "boardColor": { primary: "#cc4a57", secondary: "#FFC371", gradient: "linear-gradient(to right bottom, #cc4a57, #ff7a65, #ff9362, #ffac66, #ffc371)", emoji: "🌺" },
  },
  {
    "boardName": "Project Delta",
    "isFavorite": false,
    "description": "Board for Project Delta",
    "isWatching": true,
    "lists": [
      {
        "listName": "Research",
        "items": [
          {
            "id": 17,
            "title": "Task 17",
            "description": "Description of Task 17",
            "isWatching": false,
            "labels": [
              {
                "labelColorName": "purple",
                "labelColorCode": "purple",
                "labelIsChecked": true,
                "labelTitle": "Exploratory",
                "labelIndex": 0
              }
            ]
          },
          {
            "id": 18,
            "title": "Task 18",
            "description": "Description of Task 18 sexy pants sexy dawgs",
            "isWatching": true,
            "labels": []
          }
        ]
      },
      {
        "listName": "Analysis",
        "items": [
          {
            "id": 19,
            "title": "Task 19",
            "description": "Description of Task 19",
            "isWatching": false,
            "labels": []
          },
          {
            "id": 20,
            "title": "Task 20",
            "description": "Description of Task 20",
            "isWatching": true,
            "labels": [
              {
                "labelColorName": "green",
                "labelColorCode": "green",
                "labelIsChecked": true,
                "labelTitle": "High Priority",
                "labelIndex": 0
              }
            ]
          }
        ]
      },
      {
        "listName": "Documentation",
        "items": [
          {
            "id": 21,
            "title": "Task 21",
            "description": "Description of Task 21",
            "isWatching": false,
            "labels": []
          }
        ]
      }
    ],
    "boardColor": { primary: "#bf7272", secondary: "#A890FE", gradient: "linear-gradient(to right bottom, #bf7272, #ef85a3, #e981bf, #d485df, #a890fe)", emoji: "🌺" },
  },
  {
    "boardName": "Project Epsilon",
    "isFavorite": false,
    "description": "Board for Project Epsilon",
    "isWatching": false,
    "lists": [
      {
        "listName": "Idea Generation",
        "items": [
          {
            "id": 22,
            "title": "Task 22",
            "description": "Description of Task 22",
            "isWatching": true,
            "labels": []
          },
          {
            "id": 23,
            "title": "Task 23",
            "description": "Description of Task 23",
            "isWatching": false,
            "labels": [
              {
                "labelColorName": "red",
                "labelColorCode": "red",
                "labelIsChecked": true,
                "labelTitle": "Critical",
                "labelIndex": 0
              }
            ]
          },
          {
            "id": 24,
            "title": "Task 24",
            "description": "Description of Task 24",
            "isWatching": true,
            "labels": []
          }
        ]
      },
      {
        "listName": "Prototyping",
        "items": [
          {
            "id": 25,
            "title": "Task 25",
            "description": "Description of Task 25",
            "isWatching": true,
            "labels": [
              {
                "labelColorName": "yellow",
                "labelColorCode": "yellow",
                "labelIsChecked": true,
                "labelTitle": "Medium Priority",
                "labelIndex": 0
              }
            ]
          },
          {
            "id": 26,
            "title": "Task 26",
            "description": "Description of Task 26",
            "isWatching": false,
            "labels": []
          }
        ]
      }
    ],
    "boardColor":     { primary: "#9e1c4b", secondary: "#1D2671", gradient: "linear-gradient(to right bottom, #9e1c4b, #a62a6f, #822675, #572676, #1d2671)", emoji: "💗" },
  }
] as boardProps[];

export const updatedTrelloState = initialTrelloState.map( (board, index) => ({
  ...board,
  id: index,
  lists: board.lists.map( (list, listIndex) => ({
    ...list,
    id: listIndex
  }))
}))
  
export const getBoardByName = (name: string) => {
  const filtered = initialTrelloState.filter ( (b) => b.boardName === name)

  if(filtered.length === 0){
    return undefined;
  }

  return filtered[0] as boardProps
}