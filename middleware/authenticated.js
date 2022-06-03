export default function({ store, redirect }) {
  const session = !!store.getters["authentication/token"];

  if (!session) {
    return redirect("/");
  }
}
