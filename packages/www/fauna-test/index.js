require("dotenv").config({ path: `.env` });
const faunadb = require("faunadb");
const q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNA });

console.log("hi", process.env.FAUNA);

async function run() {
  try {
    // const results = await client.query(
    //   q.Update(q.Ref(q.Collection("todos"), "266995332355719700"), {
    //     data: {
    //       done: true,
    //     },
    //   })
    // );

    const results = await client.query(
      q.Create(q.Collection("todos"), {
        data: {
          text: "wtf",
          done: false,
          owner: "user-test-2",
        },
      })
    );
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}

const results = await client.query(
  q.Paginate(q.Match(q.Index("todos_by_user", "user-test")))
);

run();
