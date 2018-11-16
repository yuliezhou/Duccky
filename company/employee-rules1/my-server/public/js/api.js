// let apiurl = 'http://192.168.12.109:8141'
let apiurl = 'http://api.2018tj.cqxcx.net'
let Api = {
    signUp(username,cardcode) {
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiurl}/index/Pair/getpd`,
                method: 'post',
                data: {
                    username: username,
                    cardcode:cardcode
                },
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    forQuestion() {
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiurl}/index/Luck/forQuestion`,
                method: 'post'
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    forBirthdayPeople() {
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiurl}/index/Luck/forBirthdayPeople`,
                method: 'post'
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    forBirthdayGift() {
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiurl}/index/Luck/forBirthdayGift`,
                method: 'post'
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    forPeople() {
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiurl}/index/Luck/forPeople`,
                method: 'post'
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

}
