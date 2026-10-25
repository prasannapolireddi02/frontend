/* =========================================
   OTHER DISEASE
========================================= */

const otherDisease =
    document.getElementById("otherDisease");

const otherDiseaseBox =
    document.getElementById("otherDiseaseBox");

const otherDiseaseName =
    document.getElementById("otherDiseaseName");


otherDisease.addEventListener(
    "change",
    function () {

        if (this.checked) {

            otherDiseaseBox.classList.add("show");

            otherDiseaseName.required = true;

        } else {

            otherDiseaseBox.classList.remove("show");

            otherDiseaseName.required = false;

            otherDiseaseName.value = "";

        }

    }
);


/* =========================================
   NONE DISEASE
========================================= */

const noneDisease =
    document.getElementById("noneDisease");

const diseaseCheckboxes =
    document.querySelectorAll(
        'input[name="disease"]'
    );


noneDisease.addEventListener(
    "change",
    function () {

        if (this.checked) {

            diseaseCheckboxes.forEach(
                checkbox => {

                    if (checkbox !== noneDisease) {

                        checkbox.checked = false;

                    }

                }
            );


            otherDiseaseBox.classList.remove(
                "show"
            );

            otherDiseaseName.required = false;

            otherDiseaseName.value = "";

        }

    }
);


/* =========================================
   IF OTHER DISEASE IS SELECTED
   REMOVE NONE
========================================= */

diseaseCheckboxes.forEach(
    checkbox => {

        checkbox.addEventListener(
            "change",
            function () {

                if (
                    this.checked &&
                    this !== noneDisease
                ) {

                    noneDisease.checked = false;

                }

            }
        );

    }
);


/* =========================================
   REGISTRATION
========================================= */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Personal details */

            const fullName =
                document.getElementById(
                    "fullName"
                ).value.trim();


            const age =
                document.getElementById(
                    "age"
                ).value;


            const gender =
                document.getElementById(
                    "gender"
                ).value;


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const location =
                document.getElementById(
                    "location"
                ).value.trim();


            /* Account */

            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const password =
                document.getElementById(
                    "password"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            /* =====================================
               PASSWORD CHECK
            ===================================== */

            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }


            /* =====================================
               DISEASES
            ===================================== */

            let diseases = [];


            diseaseCheckboxes.forEach(
                checkbox => {

                    if (checkbox.checked) {

                        diseases.push(
                            checkbox.value
                        );

                    }

                }
            );


            /* =====================================
               OTHER DISEASE
            ===================================== */

            if (
                otherDisease.checked &&
                otherDiseaseName.value.trim() !== ""
            ) {

                diseases.push(
                    otherDiseaseName.value.trim()
                );

            }


            /* =====================================
               HEALTH INFORMATION
            ===================================== */

            const healthInfo =
                document.getElementById(
                    "healthInfo"
                ).value.trim();


            /* =====================================
               USER OBJECT
            ===================================== */

            const user = {

                fullName: fullName,

                age: age,

                gender: gender,

                phone: phone,

                location: location,

                diseases: diseases,

                healthInformation:
                    healthInfo,

                email: email,

                registeredAt:
                    new Date().toISOString()

            };


            /* =====================================
               DEMO STORAGE
            ===================================== */

            localStorage.setItem(
                "airguardUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "airguardEmail",
                email
            );


            localStorage.setItem(
                "airguardPassword",
                password
            );


            /* =====================================
               SUCCESS
            ===================================== */

            alert(
                "Account created successfully! 🌿"
            );


            /* Go to login */

            window.location.href =
                "index.html";

        }
    );