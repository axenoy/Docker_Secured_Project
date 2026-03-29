async function loadUsers() {

    const token = localStorage.getItem("adminToken")

    if (!token) {
        window.location.href = "login.html"
        return
    }

    const res = await fetch("/api/users", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (!res.ok) {
        alert("Failed to load users")
        return
    }

    const users = await res.json()
    const list = document.getElementById("users")

    list.innerHTML = ""

    users.forEach(user => {

        const li = document.createElement("li")
        li.innerText = user.email

        list.appendChild(li)
    })
}

function logout() {
    localStorage.removeItem("adminToken")
    window.location.href = "login.html"
}

loadUsers()