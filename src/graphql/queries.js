// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    postType
    caption
    tags
    category
    style
    img
    postedBy
    createdDate
    hairNeck
    torsoWaist
    thighAnkle
    ankleToe
    acessories
  }
}
`;
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      postType
      caption
      tags
      category
      style
      img
      postedBy
      createdDate
      hairNeck
      torsoWaist
      thighAnkle
      ankleToe
      acessories
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    Name
    avatar
    createdDate
    likedCategories
    saved {
      id
      createdDate
      group
    }
    savedProducts {
      price
      img
      link
      part
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      Name
      avatar
      createdDate
      likedCategories
      saved {
        id
        createdDate
        group
      }
      savedProducts {
        price
        img
        link
        part
      }
    }
    nextToken
  }
}
`;
export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    image
    owner
    tags
    Price
    createdDate
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      image
      owner
      tags
      Price
      createdDate
    }
    nextToken
  }
}
`;
export const getNewPost = `query GetNewPost($id: String!, $createdDate: String!) {
  getNewPost(id: $id, createdDate: $createdDate) {
    id
    postType
    caption
    tags
    category
    style
    img
    postedBy
    createdDate
    hairNeck
    torsoWaist
    thighAnkle
    ankleToe
    acessories
  }
}
`;
export const listNewPosts = `query ListNewPosts(
  $id: String
  $createdDate: ModelStringKeyConditionInput
  $filter: ModelNewPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listNewPosts(
    id: $id
    createdDate: $createdDate
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      postType
      caption
      tags
      category
      style
      img
      postedBy
      createdDate
      hairNeck
      torsoWaist
      thighAnkle
      ankleToe
      acessories
    }
    nextToken
  }
}
`;
