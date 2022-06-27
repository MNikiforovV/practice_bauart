<template>
    <div class="V_Auth">
        
        <div class="container mt-5 position-absolute top-50 start-50 translate-middle">
            <div class="row">
                <div class="col-sm-3 mx-auto">
                    <form @submit.prevent="authUser" novalidate>

                        <div>
                            <div class="mb-3">
                                <label for="login" class="form-label">Логин</label>
                                <input type="login" class="form-control" id="login" placeholder="Ваш логин">
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Пароль</label>
                                <input type="password" class="form-control" id="password" placeholder="Ваш пароль">
                            </div>

                            <button type="submit" class="btn btn-primary">Авторизация</button>

                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    method: {
        authUser() {
            console.log('Авторизация прошла успешно!')
        }
    }
}

</script>

<style>
</style>
