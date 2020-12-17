import User from "./../entity/User"

export default class Session {
    private static KEY: string = "session";

    public static set(user: User){
        if (user === null){
            window.sessionStorage.removeItem(Session.KEY);
        }else{
            window.sessionStorage.setItem(Session.KEY, JSON.stringify(user));
        }
    }

    public static get(key?: keyof User){
        const session: string | null = window.sessionStorage.getItem(Session.KEY);

        if(session){
            if (key){
                const user: User = User.InstanceFrom(JSON.parse(session));

                return user.hasOwnProperty (key) ? user[key] : null
            }
            return User.InstanceFrom(JSON.parse(session));
        }

        return null;
    }

    public static isLogin(){
        const user: User = Session.get();

        return user instanceof User && user.id > 0 && user.token.length > 10;
    }
}