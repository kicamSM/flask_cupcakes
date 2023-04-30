const BASE_URL = "http://127.0.0.1:5000/api";

function generateCupcakeHTML(cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button btn-lrg btn-danger text-center">Delete</button>
      </li>
      <img class="border rounded border-dark border-3 mg-fluid Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
  `;
  // NOTE HERE WE ARE JUST DYNAMICALLY CREATING THE HTML FOR THE NEW CUPCAKE
}


/** put initial cupcakes on page. */

// async function showInitialCupcakes() {
//   const response = await axios.get(`${BASE_URL}/cupcakes`);

//   for (let cupcakeData of response.data.cupcakes) {
//     let newCupcake = $(generateCupcakeHTML(cupcakeData));
//     $("#cupcakes-list").append(newCupcake);
//   }
// }


/** handle form for adding of new cupcakes */

$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });

  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  $("#cupcakes-list").append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
});


/** handle clicking delete: delete cupcake */

// $("#cupcakes-list").on("click", ".delete-button", async function (evt) {
//   evt.preventDefault();
//   let $cupcake = $(evt.target).closest("div");
//   let cupcakeId = $cupcake.attr("data-cupcake-id");

//   await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
//   $cupcake.remove();
// });

// ------------------------------------------
// my delete function

$('.delete-cupcake').click(deleteCupcake)

async function deleteCupcake(evt) {
  // const id = $(this).data('id')
  // console.log(id)
  // await axios.delete(`/api/cupcakes/${id}`)
  // $(this).parent().remove()
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-id");
  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
}



// $(showInitialCupcakes);

// $('.submit-cupcake').click(addCupcake)
    
// async function addCupcakeHTML(cupcake) {

    // let form = document.getElementById("example-form");
    //          let formData = new FormData(form);
    //          let csrf_token = document.getElementById("csrf_token").value
    //          formData.append("csrf_token", csrf_token)
    //          fetch("{{ url_for('index') }}", {
    //              method: "post",
    //              body: formData
    //          })
    //              .then(response => response.json())
    //              .then(response => {
    //                  console.log(response["data"]);
    // alert("You have clicked submit cupcake")
    // await axios.delete(`/api/todos/${id}`)
    // $(this).parent().remove()
