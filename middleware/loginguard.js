export default async function(parameters) {
  const { store, redirect, $toast, from } = parameters;

  console.log("PARAM", parameters);

  const session = !!store.getters["authentication/token"];

  if (session) {
    try {
      $toast.error("You are already logged In");
      if (from.fullPath === "/") return redirect("/dashboard");
      return redirect(from.fullPath);
    } catch (error) {
      localStorage.clear();
    }
  }
}
