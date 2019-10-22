// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
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
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
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
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    username
    Name
    avatar
    createdDate
    likedCategories
    saved {
      group
      sN
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    username
    Name
    avatar
    createdDate
    likedCategories
    saved {
      group
      sN
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    username
    Name
    avatar
    createdDate
    likedCategories
    saved {
      group
      sN
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
export const onCreateProduct = `subscription OnCreateProduct {
  onCreateProduct {
    id
    image
    owner
    tags
    Price
    createdDate
  }
}
`;
export const onUpdateProduct = `subscription OnUpdateProduct {
  onUpdateProduct {
    id
    image
    owner
    tags
    Price
    createdDate
  }
}
`;
export const onDeleteProduct = `subscription OnDeleteProduct {
  onDeleteProduct {
    id
    image
    owner
    tags
    Price
    createdDate
  }
}
`;
export const onCreateNewPost = `subscription OnCreateNewPost {
  onCreateNewPost {
    group
    sN
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
export const onUpdateNewPost = `subscription OnUpdateNewPost {
  onUpdateNewPost {
    group
    sN
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
export const onDeleteNewPost = `subscription OnDeleteNewPost {
  onDeleteNewPost {
    group
    sN
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
