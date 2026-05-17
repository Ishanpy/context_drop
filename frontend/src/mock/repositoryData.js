import {
  createRepositoryNode,
} from "../models/repositoryModel";

export const repositoryTree = [

  createRepositoryNode({
    id: 1,

    name: "src",

    type: "folder",

    path: "/src",

    children: [

      createRepositoryNode({
        id: 2,

        name: "components",

        type: "folder",

        path:
          "/src/components",

        children: [

          createRepositoryNode({
            id: 3,

            name:
              "Sidebar.jsx",

            type: "file",

            path:
              "/src/components/Sidebar.jsx",
          }),

          createRepositoryNode({
            id: 4,

            name:
              "DashboardPage.jsx",

            type: "file",

            path:
              "/src/components/DashboardPage.jsx",
          }),

        ],
      }),

    ],
  }),

];