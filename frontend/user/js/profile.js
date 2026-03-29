async function loadProfile() {

    const token = localStorage.getItem("token")

    if (!token) {
        window.location.href = "login.html"
        return
    }

    const res = await fetch("/api/profile", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (!res.ok) {
        alert("Unauthorized")
        return
    }

    const data = await res.json()

    document.getElementById("profile").innerText =
        "Email: " + data.email
}

function logout() {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

loadProfile()