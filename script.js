document.addEventListener("DOMContentLoaded", () => {
  const toggleIcon = document.querySelector(".toggle-icon");
  const form = document.querySelector(".collapsible-form");
  const submitButton = document.getElementById("submit-button");

  const scriptUrl =
    " https://script.google.com/macros/s/AKfycbzPgOuXmu7SLjCwNTd38uPsw6dqZdUaTt73RGQeyZ4IQqTz8J4uYt5X1LTIJbzbmQ2NZQ/exec";

  // Toggle form visibiity
  toggleIcon.addEventListener("click", () => {
    form.classList.toggle("expanded");
    toggleIcon.classList.toggle("rotated");
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const formData = {
      firstName: document.getElementById("firstname").value,
      lastName: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      address1: document.getElementById("address1").value,
      address2: document.getElementById("address2").value,
      postalCode: document.getElementById("postalCode").value,
      city: document.getElementById("city").value,
      recommendation: document.getElementById("recommendation").value,
    };

    console.log("Form data being sent:", formData);

    fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.text();
      })
      .then((data) => {
        console.log("Raw response", data);
        alert("Success! Data submitted.");
        form.reset();

        form.classList.remove("expanded");
        toggleIcon.classList.remove("rotated");
      })

      .catch((error) => {
        console.error("Error:", error);
        alert(`Failed: ${error.message}`);
      });
  });
});
