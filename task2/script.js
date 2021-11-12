const btn1 = document.querySelector("#post");
const btn2 = document.querySelector("#get");
const btn3 = document.querySelector("#put");
const btn4 = document.querySelector("#delete");

let arr = [btn1, btn2, btn3, btn4];
// const getApidata = async (link, func) => {
//   try {
//     let x = await fetch(link);
//     let y = await x.json();
//     func(y);
//   } catch (e) {
//     console.log("error");
//   }
// };
// function events(args) {
//   args.forEach((elm) => {
//     elm.addEventListener("click", (e) => {
//       getApidata(
//         `https://jsonplaceholder.typicode.com/${e.target.textContent}`,
//         (res) => {
//           console.log(res);
//         }
//       );
//     });
//   });
// }
// events(arr);
arr.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    let Method = e.target.textContent;
    console.log(e.target.textContent);
    if (Method == "GET") {
      let res = await (
        await fetch(`https://jsonplaceholder.typicode.com/posts`, {
          method: Method,
        })
      ).json();
      console.log(res);
    } else if (Method === "POST") {
      let posted = await (
        await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
          method: Method,
          body: JSON.stringify({
            id: 1,
            title: "foo",
            body: "bar",
            userId: 1,
          }),
        })
      ).json();
      console.log(posted);
    } else if (Method === "PUT") {
      await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
        method: Method,
        body: JSON.stringify({
          id: 1000,
          title: "new title",
        }),
      });

      console.log("updated");
    } else if (Method === "DELETE") {
      await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
        method: Method,
      });

      console.log("deleted");
    }
  });
});
