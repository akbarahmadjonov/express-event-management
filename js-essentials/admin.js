//* Event
const speaker_form = document.getElementById("speaker_form");
const event_form = document.getElementById("event_form");

const speaker_name_post = document.getElementById("name");
const founder = document.getElementById("founder");
const image = document.getElementById("image");

speaker_form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the selected file
  const file = image.files[0];
  console.log(file);

  const formData = new FormData();
  formData.append("image", file);
  formData.append("speaker_name", speaker_name_post.value);
  formData.append("founder_of", founder.value);

  // Try / Catch
  try {
    const response = fetch("http://localhost:4000/speaker", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Form has been sent successfully!");
      speaker_form.reset();
    } else {
      alert("Form has not been sent " + response.status);
    }
  } catch (error) {
    console.log("Error: " + error);
  }
});
