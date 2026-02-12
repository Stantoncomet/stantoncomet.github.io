let logged_in = '';

async function login() {

    console.log("Logging in...")
    logged_in = document.getElementById('username').value.trim();
    if (logged_in == '') {
        console.log("No username inputted");
        return;
    }
    

    // check user exists
    let user_list = await fetchFileData(`example/user_list`);
    
    if (!user_list.users.includes(logged_in)) {
        console.log("No user found, registeing now");
        // no registered user? make one!
        let new_user_data = {
            money: 10,
            friends: []
        }
        await setFileData(`example/users/${logged_in}`, new_user_data);
        
        // add to user_list
        await updateFileData('example/user_list', data => {
            data.users.push(logged_in);
            return data;
        })
        console.log(`Registered ${logged_in}!`);
    }
    console.log("Logged in! Fetching data...")


    // update stats
    displayInfo();

    console.log("Data fetched!");
}


async function upMoney(count) {
    if (logged_in == '') {
        console.log("No username inputted");
        return;      
    }

    await updateFileData(`example/users/${logged_in}`, data => {
        data.money += count;
        return data;
    })

    displayInfo();
}

async function addFriend() {
    let new_friend = document.getElementById('friend-name').value.trim();
    if (logged_in == '' || new_friend == '') {
        console.log("No username inputted");
        return;
    } 

    // check if user exists
    let user_list = await fetchFileData(`example/user_list`);
    if (!user_list.users.includes(new_friend)) {
        console.log("Adding friend failed, user does not exist");
        return;
    }

    //already a friend?
    let user_data = await fetchFileData(`example/users/${logged_in}`);
    if (user_data.friends.includes(new_friend)) {
        console.log("Adding friend failed, user already has that friend");
        return
    }

    // add to friends list
    await updateFileData(`example/users/${logged_in}`, data => {
        data.friends.push(new_friend)
        return data;
    }) 

    displayInfo();

    console.log("Added friend!");
}



async function displayInfo() {
    // fetch user data
    let user_data = await fetchFileData(`example/users/${logged_in}`);

    document.getElementById('name').innerText = `name: ${logged_in}`;
    document.getElementById('money').innerText = `$${user_data.money}`;

    let friends_list = "friends: ";
    user_data.friends.forEach(f => {
        friends_list += `${f}, `;
    })
    // remove trailing comma, 
    friends_list = friends_list.slice(0, -2);
    document.getElementById('friend-list').innerText = friends_list;
}