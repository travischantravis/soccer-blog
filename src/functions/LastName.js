// Convert full name to last name
const LastName = (name) => {
  let lname = name;
  // Get the last word of the string
  lname = name.substring(name.lastIndexOf(" ") + 1);
  // console.log(name);
  return lname;
};

export default LastName;
