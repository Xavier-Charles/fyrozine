// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
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
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
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
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    Name
    avatar
    createdDate
    likedCategories
    saved
    savedProducts {
      price
      img
      link
      part
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    Name
    avatar
    createdDate
    likedCategories
    saved
    savedProducts {
      price
      img
      link
      part
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    Name
    avatar
    createdDate
    likedCategories
    saved
    savedProducts {
      price
      img
      link
      part
    }
  }
}
`;
export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    image
    owner
    tags
    Price
    createdDate
  }
}
`;
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    id
    image
    owner
    tags
    Price
    createdDate
  }
}
`;
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
    id
    image
    owner
    tags
    Price
    createdDate
  }
}
`;
