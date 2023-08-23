import React from 'react'
import DataGrid from "../../components/common/DataTable/DataTable"
import BasicCard from "../../components/common/BasicCard/BasicCard"
import GridWrapper from "../../components/common/GridWrapper/GridWrapper"

const MachineLearning = () => {

    const getContent = () => (
        <>
        <DataGrid />
        </>
          
      );

    return (
    <GridWrapper>
      <BasicCard content={getContent()} />
      {/* <NewUserModal
        open={open}
        onClose={() => setOpen(false)}
        addNewUser={addNewUser}
      /> */}
    </GridWrapper>
  );
}

export default MachineLearning
