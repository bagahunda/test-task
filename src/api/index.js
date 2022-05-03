const PER_PAGE = 20;
export const init = async () => {
  const data = await fetch(
    "https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json"
  );
  const users = await data.json();
  return users;
};

export const getUsers = async (page, query) => {
  const data = await fetch(
    "https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json"
  );
  const users = await data.json();
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  let filteredUsers = [];
  if (query.length) {
    filteredUsers = users.filter((user) => {
      const keys = ["name", "email", "title", "address"];
      const search = query.toLowerCase();
      return keys.some((key) => user[key].toLowerCase().includes(search));
    });
  } else {
    filteredUsers = users;
  }
  const totalPages = Math.ceil(filteredUsers.length / PER_PAGE);
  const pagination = {
    activePage: page,
    isLastPage: totalPages === page,
  };
  const res = filteredUsers.slice(start, end);
  return {
    data: res,
    pagination,
  };
};
