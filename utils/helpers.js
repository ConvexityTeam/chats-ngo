/**
 * This enum handles the different statuses to be listened to while disabling certain campaign Features
 * @ param {array}
 */

export const statuses = ["active", "completed", "ongoing", "ended"];
export const campaignStatus = (status) => {
  switch (status) {
    case "active":
      return "progress";

    case "ongoing":
      return "ongoing";

    case "completed":
      return "completed";

    case "ended":
      return "ended";

    default:
      return "pending";
  }
};
