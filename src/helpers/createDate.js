const CreateDate = (timer) => {
    return (
        `${new Date().getFullYear()}-${(`${(new Date().getMonth())}`.length=== 1 )? '0'+new Date().getMonth() :new Date().getMonth()}-${(`${(new Date().getDate())}`.length=== 1 )? '0'+new Date().getDate() :new Date().getDate()}`
    )
}

export default CreateDate;