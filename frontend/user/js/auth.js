async function login() {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {

        localStorage.setItem("token", data.token)

        window.location.href = "profile.html"

    } else {

        alert(data.message || "Login failed")

    }
}

async function register() {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const res = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {

        alert("Registration successful")
        window.location.href = "login.html"

    } else {

        alert(data.message || "Registration failed")

    }
}