function saveBookmarkToServer(username, postId) {
    fetch("/saveBookmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            postId: postId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Bookmark saved successfully!");
        } else {
            console.error("Failed to save bookmark:", data.message);
        }
    });
}

function removeBookmarkFromServer(username, postId) {
    fetch("/removeBookmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            postId: postId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Bookmark removed successfully!");
        } else {
            console.error("Failed to remove bookmark:", data.message);
        }
    });
}
