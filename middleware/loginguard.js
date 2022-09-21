export default async function (parameters) {
  const { store, redirect, $toast, from } = parameters;

  console.log("PARAM", parameters);

  const session = !!store.getters["authentication/token"];

  if (session) {
    try {
      if (from.fullPath === "/") {
        $toast.error("You are already logged In");
        return redirect("/dashboard");
      }
      return redirect(from.fullPath);
    } catch (error) {
      localStorage.clear();
    }
  }
}
