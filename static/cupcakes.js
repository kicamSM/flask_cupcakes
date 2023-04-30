const BASE_URL = "http://127.0.0.1:5000/api";

function generateCupcakeHTML(cupcake) {
  return `
    <div data-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-cupcake btn-lrg btn-danger text-center">Delete</button>
      </li>
      <img class="border rounded border-dark border-3 mg-fluid Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
  `;
  // NOTE HERE WE ARE JUST DYNAMICALLY CREATING THE HTML FOR THE NEW CUPCAKE
}


/** put initial cupcakes on page. */

async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcakeData of response.data.cupcakes) {
    // console.log(response.data.cupcakes)
    // this is simply a for loop that  is taking each indiviual cupcake out of all cupcakes in the db and genderating the html for them adn then appending these to page. 
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}
// not sure if I am not supposed to be adding the original cupcakes through the html..... ? instructions did not seem clear on this. I believe we are supposed to be doing this through tghe JS... leaving both just one commented out due to that fact. 


/** handle form for adding of new cupcakes */

$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();
  // obtaining values from form

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });

  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  // generating the html for the new cupcake
  $("#cupcakes-list").append(newCupcake);
  // appending to new cupcake to page.
  $("#new-cupcake-form").trigger("reset");
  // resting the form to add new cupcake.
});


$("#cupcakes-list").on("click", async function (evt) {
  // note you have to have an id here to get this to funciton with dynamically appended html
  evt.preventDefault();
  // alert("you clicked delete button")
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-id");
  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
})


// $('.delete-cupcake').click(deleteCupcake)

// async function deleteCupcake(evt) {
//   alert("you clicked delete button")
//   evt.preventDefault();
//   let $cupcake = $(evt.target).closest("div");
//   let cupcakeId = $cupcake.attr("data-id");
//   await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
//   $cupcake.remove();
// }
// note that this works for the delete button when it is appending through the html and not through the javascript 

// this is calling the show initial cupcakes so they load immediately. 
$(showInitialCupcakes);