export function createMessage({

  id,

  role,

  content,

  createdAt =
    new Date().toISOString(),

}) {

  return {

    id,

    role,

    content,

    createdAt,

  };

}