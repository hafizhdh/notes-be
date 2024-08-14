import prisma from "./plugin/prisma/prisma.service"

const main = async () => {
  const notes = [
    {
      "title": "Assignment",
      "body": "Dibimbing study case",
    },
    {
      "title": "Shopping",
      "body": "Milk, Egg, and Bread"
    }
  ]

  for (const note of notes) {
    await prisma.note.create({
      data: note
    })
  }
}

main()
  .then(async () => {
    console.log("Success!");
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });