import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findMany() {
  const result = await prisma.user.findMany({
    include: {
      posts: true,
    },
    // where: {
  });

  console.log(result);
  result.forEach((user) => {
    user.posts.forEach((post) => {
      console.log(user.name, "Post: ", post.title);
    });
  });
}

async function createUser() {
  const newUser = await prisma.user.create({
    data: {
      name: "Thomas",
      email: "thomas@example.com",
    },
  });

  console.log(newUser);
}
async function createUserWithPost() {
  const newUser = await prisma.user.create({
    data: {
      name: "Lionel",
      email: "lionel@example.com",
      posts: {
        create: {
          title: "Lionel Post",
          content: "This post is created by lionel",
          published: true,
        },
      },
    },
  });

  console.log(newUser);
}

async function findOne() {
  const result = await prisma.user.findFirst({
    where: {
      OR: [
        {
          id: 1,
        },
        {
          name: "Thomas",
        },
      ],
    },
    include: {
      posts: true,
    },
  });

  console.log(result);
}

async function deleteUser() {
  try {
    const newUser = await prisma.user.delete({
      where: {
        email: "thomas91@example.com",
      },
    });
    console.log(newUser);
  } catch (err) {
    console.log(err.meta);
  }
}

async function updateUser() {
  const newUser = await prisma.user.update({
    where: {
      email: "thomas@example.com",
    },
    data: {
      name: "Thomas",
      email: "thomas91@example.com",
    },
  });

  console.log(newUser);
}

async function updateMany() {
  const newUser = await prisma.user.updateMany({
    where: {
      lastname: null,
    },
    data: {
      lastname: "Doe",
    },
  });

  console.log(newUser);
}

async function upsert() {
  const user = await prisma.user.upsert({
    where: {
      email: "'thomas91@example.com",
    },
    create: {
      name: "Thomas",
      email: "'thomas91@example.com",
    },
    update: {
      lastname: "The Train",
    },
  });

  console.log(user);
}

async function createUserAndPost() {
  const newUser = await prisma.user.create({
    data: {
      name: "Mariano",
      email: "Mariano@example.com",
    },
  });

  const firstPost = await prisma.post.create({
    data: {
      title: "First Post of Mariano",
      authorId: newUser.id, // se puede agragar el "ID" como la FOREIGN KEY
    },
  });
  const secondPost = await prisma.post.create({
    data: {
      title: `Second Post of ${newUser.name}`,
      author: {
        connect: {
          id: newUser.id, // se conecta al post con el usuario y Prisma resulve la relacion
        },
      },
    },
  });

  console.log(newUser);
  console.log(firstPost);
  console.log(secondPost);
}

async function logUserAndPosts() {
  const user = await prisma.user.findUnique({
    where: {
      email: "Mariano@example.com",
    },
    include: {
      posts: true,
    },
  });
  console.log(user);
}
async function logUsersAndPosts() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  users.forEach((user) => {
    console.log("Name: ", user.name);
    console.log("Email: ", user.email);
    console.log("Post: ", user.name);

    user.posts.forEach((post, i) => {
      console.log(`> ${i + 1}`);
      console.log(`> Title: `, post.title);
      console.log("> Content: ", post.content);
    });
    console.log("----------------");
  });
}

// findMany()
// createUser()
// findOne()
// deleteUser()
// updateUser()
// updateMany()
// upsert()
// createUserAndPost()
// createUserWithPost()
// logUserAndPosts()
logUsersAndPosts();

