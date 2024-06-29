export const responseSuccess1 = {
  status: true,
  statusCode: 200,
  result: {
    profile: {
      id: "230123",
      username: "Jerrie Jayadi",
      email: "jerriejayadi@gmail.com",
      role: "admin",
      image:
        "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/1D-wAR6TnDXS1oqa00SN0.jpg?alt=media&token=4cea61a7-6146-4df6-9eee-16ccc2d8ec4c",
    },
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBtYWlsLmNvbSIsIm5hbm9JZCI6IjIzMTIzIiwibmFub1RhZyI6ImRldnNzcyIsInVzZXJJZCI6IjIxMzIzMTIzIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMjhUMDU6MjQ6MDAuMDAwWiJ9.MYPrwpfhcM6SDf7wrgeIz6dwhghlxQrCCxOMJmPLbTI",
  },
};

export const responseSuccess2 = {
  status: true,
  statusCode: 200,
  result: {
    profile: {
      id: "230123",
      username: "Erwin Wijaya",
      email: "erwinwijaya@gmail.com",
      role: "listing",
      image: null,
    },
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBtYWlsLmNvbSIsIm5hbm9JZCI6IjIzMTIzIiwibmFub1RhZyI6ImRldnNzcyIsInVzZXJJZCI6IjIxMzIzMTIzIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMjhUMDU6MjQ6MDAuMDAwWiJ9.MYPrwpfhcM6SDf7wrgeIz6dwhghlxQrCCxOMJmPLbTI",
  },
};

export const responseSuccess3 = {
  status: true,
  statusCode: 200,
  result: {
    profile: {
      id: "230123",
      username: "Jerrie",
      email: "jerrieselling@gmail.com",
      role: "selling",
      image: null,
    },
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBtYWlsLmNvbSIsIm5hbm9JZCI6IjIzMTIzIiwibmFub1RhZyI6ImRldnNzcyIsInVzZXJJZCI6IjIxMzIzMTIzIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMjhUMDU6MjQ6MDAuMDAwWiJ9.MYPrwpfhcM6SDf7wrgeIz6dwhghlxQrCCxOMJmPLbTI",
  },
};

export const responseNotFound = {
  status: false,
  statusCode: 404,
  path: "auth/login",
  message: "USER_NOT_FOUND",
  result: null,
};

export const responseInternalServerError = {
  status: false,
  statusCode: 500,
  path: "auth/login",
  message: "Internal Server Error",
};
