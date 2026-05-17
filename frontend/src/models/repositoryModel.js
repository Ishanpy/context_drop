export function createRepositoryNode({

  id,

  name,

  type,

  path,

  children = [],

}) {

  return {

    id,

    name,

    type,

    path,

    children,

  };

}