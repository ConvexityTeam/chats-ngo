export default function (parameters) {
  const { redirect, $toast, from } = parameters;

  const session = !!sessionStorage.getItem("userToken");

  if (session) {
    try {
      if (from.fullPath === "/") {
        $toast.error("You are already logged In");
        return redirect("/dashboard");
      }
      return redirect(from.fullPath);
    } catch (error) {
      sessionStorage.clear();
    }
  }
}
