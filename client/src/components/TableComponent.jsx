import { useState } from "react";
import styled from "styled-components";
import deleteBtn from "../assets/fluent_delete-48-filled (1).png";
import { mobile, aboutResponsive } from "../responsive.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Box, Modal, Fade } from "@mui/material";
import WindowSize from "../hooks/windowSize";
import CreateAccomodation from "./CreateAccomodation";
import axios from "axios";
import { dispatchUserAllAccomodations } from "../redux/accomodationsSlice";
import Spinner from "./Spinner";
import NoData from "./NoData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
  height: "100%",
  borderRadius: "10px",
};

const TableDiv = styled.div`
  width: 100%;
  overflow-x: auto;
  ${aboutResponsive({
    width: "946px",
  })}
`;
const Table = styled.table`
  width: 100%;
`;
const Tr = styled.tr`
  height: 50px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  padding: 1rem;
  margin-bottom: 11px;
  display: grid;
  grid-template-columns: 4fr 7fr 3fr 1fr;
  place-content: center;
  align-items: center;
  justify-content: center;
`;
const Td = styled.td``;
const RightEnd = styled.div`
  display: flex;
`;
const EditButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 65px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #854bff;
  border-radius: 3px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #854bff;
  margin-right: 15px;
`;
const DeleteButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 36px;
  height: 26px;
  background: #ffeeee;
  border: 1px solid #fd4c61;
  border-radius: 3px;
`;
const LoadMoreButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 370px;
  height: 39px;
  background: #ffffff;
  border: 2px solid #dedede;
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 8px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #929292;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile({
    width: "100%",
  })};
`;

const Tbody = styled.tbody``;

const TableComponent = ({ data }) => {
  const dispatch = useDispatch();

  const userAllAccomodations = useSelector(
    (state) => state.accomodations.getAllUserAccomodations
  );
  const token = useSelector((state) => state.user.token);
  const [editID, setEditID] = useState("");
  const size = WindowSize();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async (id) => {
    handleOpen();
    if (id) {
      setEditID(id);
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      const filteredArr = userAllAccomodations.filter(
        (newArr) => newArr._id !== id
      );
      try {
        const response = await axios.delete(`/api/accomodations/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        toast(response?.data?.message, { type: "success" });
        dispatch(dispatchUserAllAccomodations(filteredArr));
      } catch (error) {
        toast(error.response?.data?.message, { type: "error" });
      }
    }
  };

  return (
    <>
      <TableDiv>
        {!userAllAccomodations ? (
          <Spinner />
        ) : (
          <Table>
            <Tbody>
              {userAllAccomodations?.map(({ _id, title, location, price }) => (
                <Tr key={_id}>
                  <Td>{title}</Td>
                  <Td>{location}</Td>
                  <Td>NGN{price}</Td>
                  <Td>
                    <RightEnd>
                      <EditButton onClick={() => handleEdit(_id)}>
                        Edit
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(_id)}>
                        <img src={deleteBtn} alt="delete" />
                      </DeleteButton>
                    </RightEnd>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableDiv>

      <LoadMoreButton>Load More</LoadMoreButton>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              width: size.width > 800 ? 800 : size.width,
            }}
          >
            <CreateAccomodation
              onClose={handleClose}
              titleCreate="Edit Accomodation"
              editID={editID}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TableComponent;
