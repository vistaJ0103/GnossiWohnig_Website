import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { device } from "../../Components/Atoms/Devices";
import Row from "../../Components/Atoms/Row";
import Column from "../../Components/Atoms/Column";
import Card from "../../Components/Molecules/Card";
import {
  callCloudFunctionWithAppCheck,
  checkIfProUser,
  setProUserStatus,
  streamCollection,
  useAuth,
} from "../../firebaseProvider";
import SwitchButton from "../../Components/Molecules/SwitchButton";
import Text from "../../Components/Atoms/Text";
import DummyCard from "../../Components/Molecules/DummyCard";
import Spinner from "../../Components/Atoms/Spinner";
import Modal from "react-modal";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import {Store} from "@revenuecat/purchases-js"
const SubTitle = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
  display: block;
  font-weight: normal;

  @media ${device.tablet} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  @media ${device.mobile} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const FreeObjects = () => {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const { t } = useTranslation();
  const [objectsInView, setObjectsInView] = useState(null);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [freeObjects, setFreeObjects] = useState(null);
  const [addSnapshots, setAddSnapshots] = useState(null);
  const [modSnapshots, setModSnapshots] = useState(null);
  const [delSnapshots, setDelSnapshots] = useState(null);
  const [proUser, setProUser] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useAuth();

  // todo: replace with check for subscription status on revenuecat
  if (proUser == null && user) {
    checkIfProUser(user.uid).then((res) => {
      setProUser(res);
    });
  }

 const sendAccessToken =async()=>{
  const encodedUserId = encodeURIComponent("srIJXEwejaPNhNuV8ZFa0RdK2H82");

//   const requestData = {
//     "app_user_id": "srIJXEwejaPNhNuV8ZFa0RdK2H82",
//     "fetch_token": "sub_1OxkmmA0PZbui0YFojuj6gzo",
//     "product_id": "prod_PmJJs4RNKr7hz0",
    
  
//     // attributes: { "stripe_customer_id": { value: "cus_PnLTqHAQbcoj7V" } }

// };
// const config = {
//     headers: {
//         'X-Platform': 'stripe',
//         'Authorization': 'Bearer sk_nEQIAZIyakfaXoXKAQEHntprkYFNW',
//         'Content-Type': 'application/json',                 
//                'Accept': '*/*' 
//     }
// };
// let formData = new FormData();
// formData.append('app_user_id', 'srIJXEwejaPNhNuV8ZFa0RdK2H82');
// formData.append('fetch_token', 'sub_1OxkmmA0PZbui0YFojuj6gzo');
//   axios({
//     url:`https://api.revenuecat.com/v2/receipts?app_user_id=${encodedUserId}`,
//     method:'post',data:requestData,
//     headers:config.headers
//   }).then((response)=>{

// console.log('Axios Successful Response',response);
//   }).catch((error)=>{
//     console.log('Axios Error Response',error);
//   })

  const _response = await fetch('https://api.revenuecat.com/v1/receipts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Platform': 'stripe',
                'Authorization': 'Bearer ' + "strp_xMmkgqSTVEydddECniZXvnbYznu",
            },
            body: JSON.stringify({
                fetch_token: "sub_1OxkmmA0PZbui0YFojuj6gzo",
                app_user_id: "srIJXEwejaPNhNuV8ZFa0RdK2H82",
            }),
          });

          console.log('asdhlkjsahdjlhajsld',_response.json());
 }
  useEffect(() => {
    sendAccessToken()

    if (query.get("id") && isSignedIn) {
      callCloudFunctionWithAppCheck("getpaymentDetails", {
        sessionId: "cs_test_a1Euj9a1MRQYUL5sEwKjs4pun5aZx0o6V21RSnNZPQmTDr1mQSbG0UyyY1",
        
      })
        .then((response) => {
console.log('Response Payment Details',response);

        }).catch((error) => {
          console.log('Error response',error);

        })

       
      callCloudFunctionWithAppCheck("sendStripeTokens", {
        app_user_id: user.uid,
        fetch_token: query.get("id"),
      })
        .then((response) => {
          console.log("Successfully sent", response);
          setProUserStatus(user.uid, true);
          setProUser(true);
        })
        .catch((error) => {
          console.log("sendStripeToken failed:", error);
        });
    }
  }, [query.get("id"), isSignedIn]);

  const sortObjects = (obj) => {
    var res = null;

    if (obj !== null) {
      res = Array.from(obj).sort((x, y) => {
        return x.timestamp - y.timestamp;
      });
      res = res.reverse();
    }
    return res;
  };

  useEffect(() => {
    streamCollection(
      "freeObjects",
      setAddSnapshots,
      setModSnapshots,
      setDelSnapshots
    );
  }, []);

  useEffect(() => {
    if (freeObjects === null) {
      const sortedAddSnap = sortObjects(addSnapshots);
      setFreeObjects(sortedAddSnap);
      setObjectsInView(sortedAddSnap);
    } else {
      addSnapshots.forEach((obj) => {
        setFreeObjects([obj, ...freeObjects]);
      });
    }
  }, [addSnapshots]);

  useEffect(() => {
    if (modSnapshots) {
      modSnapshots.forEach((obj) => {
        var index = null;

        for (var i = 0; i < freeObjects.length; i++) {
          if (freeObjects[i].id === obj.id) {
            index = i;
          }
        }
        if (index !== null) {
          let updateFreeObjects = [...freeObjects];
          updateFreeObjects[index] = obj;
          setFreeObjects(updateFreeObjects);
        }
      });
    }
  }, [modSnapshots]);

  useEffect(() => {
    if (delSnapshots) {
      delSnapshots.forEach((obj) => {
        var index = null;

        for (var i = 0; i < freeObjects.length; i++) {
          if (freeObjects[i].id === obj.id) {
            index = i;
          }
        }

        if (index !== null) {
          let updateFreeObjects = [...freeObjects];
          updateFreeObjects.splice(index, 1);
          setFreeObjects(updateFreeObjects);
        }
      });
    }
  }, [delSnapshots]);

  useEffect(() => {
    if (switchChecked) {
      var res = [];
      freeObjects.forEach((element) => {
        if (element["objectInZH"]) res.push(element);
      });
      setObjectsInView(res);
    } else {
      setObjectsInView(freeObjects);
    }
  }, [freeObjects, switchChecked]);

  const filterZHObjects = (value) => {
    setSwitchChecked(value);
    if (value) {
      var res = [];
      freeObjects.forEach((element) => {
        if (element["objectInZH"]) res.push(element);
      });
      setObjectsInView(res);
    } else {
      setObjectsInView(freeObjects);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Row justify="center" isRow={true} isRowOnMobile={true}>
          <stripe-buy-button
          client-reference-id={user?.uid}
          buy-button-id="buy_btn_1OwkvbA0PZbui0YF3nyoZ11w"
          publishable-key="pk_test_51Oc542A0PZbui0YFQYKw5YJPaJ7uhsUhMPEkEWhZiIHLQS5AEDqQxOrYabkILRkmQWUDjV7B6zkK5MqKrVed48PI00ccv7m2ll"
          ></stripe-buy-button>
        </Row>
      </Modal>
      <Row justify="center" isRow={true} isRowOnMobile={true}>
        <SubTitle>{t("Home.FreeObjects")}</SubTitle>
      </Row>
      <Row justify="center" isRow={true} isRowOnMobile={true}>
        <Column width="60%">
          <Row>
            <Column marginLeft="10px">
              <SwitchButton
                onChange={filterZHObjects}
                checked={switchChecked}
              />
              <Text
                size="14px"
                display="inline"
                marginLeft="10px"
                lineHeight="1.5"
              >
                {t("Home.OnlyZHCity")}
              </Text>
            </Column>
          </Row>
          {objectsInView ? (
            objectsInView.length === 0 ? (
              <Text marginTop="50px" size="18px">
                {t("Home.NoObjects")}
              </Text>
            ) : (
              objectsInView.map((element) =>
                proUser ? (
                  <Card key={element.id} data={element} />
                ) : (
                  <DummyCard
                    onclick={() => {
                      if (user && user?.uid) {
                        setIsOpen(true);
                      }
                    }}
                    key={element.id}
                    data={element}
                  />
                )
              )
            )
          ) : (
            <Row justify="center" isRow={true}>
              <Column marginTop="50px">
                <Spinner />
              </Column>
            </Row>
          )}
        </Column>
      </Row>
    </>
  );
};

export default FreeObjects;
