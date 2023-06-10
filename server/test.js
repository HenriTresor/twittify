const person = {
    name: 'Shimwa Tresor',
    username:`@${this?.name.split(' ').join('_')}`,
    show() {
        // const username = this?.name?.split(' ').join('_')
        console.log(this.username)
    }
}

person.show()