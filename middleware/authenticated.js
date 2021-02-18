export default function({ store, redirect }) {

    const session = !!store.getters["authentication/token"];

    // session.verify()

    if (!session) {
        return redirect("/login");
    }



};