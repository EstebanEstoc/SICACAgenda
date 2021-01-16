import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { Backdrop, CircularProgress } from "@material-ui/core";

const PromiseLoader = ({ area, style }) => {
  const { promiseInProgress } = usePromiseTracker({ area: area });

  return (
    promiseInProgress && (
      <Backdrop style={style} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  );
};

export default PromiseLoader;
