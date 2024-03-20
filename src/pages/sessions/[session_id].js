import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useCookie } from "@/utils/hooks/useCookie";
import { useLocalStorage } from "primereact/hooks";
import { getDetails } from "@/utils/api/session";
import { PageContainer } from "@/layout/Containers";
import Logo from "@/components/Logo";
import MainLayout from "@/layout/Layout";
import { Button } from "primereact/button";


export default function Session() {
  const toast = useRef(null);
  const router = useRouter();
  const [data, setData] = useState({});
  const [sessionIdLocalStorage, setSessionIdLocalStorage] = useLocalStorage(
    "0",
    "session_id"
  );
  const [sessionIdCookie, setSessionIdCookie] = useCookie(null, "session_id");
  const [sessionId, setSessionId] = useState(router.query.session_id);

  const updatePage = async () => {
    const response = await getDetails(sessionId);
    setData(response);
  };
  useEffect(() => {
    updatePage();
  }, []);

  const checkboxDatas = [
    "jan12024",
    "jan22024",
    "jan32024",
    "jan42024",
    "jan52024",
    "jan62024",
    "jan72024", 
  ];

  return (
    <MainLayout>
      <div
        className="shadow-4"
        style={{
          // minHeight: "80vh",
          marginTop: "100px",

        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            border: "1px solid #0000ff2b",
            backgroundColor: "#F4F6FA",
            padding: "40px 0px",
          }}
        >
          <div
            className="col-2 shadow-5 border-round-md bg-white"
            style={{ minWidth: "230px",maxHeight:"460px",marginTop:"10px",overflow:"auto"}}
          >
            <h5 style={{ margin: "10px", textAlign: "center" }}>
              Indexes Available
            </h5>
            <div className="flex flex-column gap-2" style={{ margin: "10px", marginTop: "20px" }}>
              {checkboxDatas?.map((d, idx) => (
                <div class="field-checkbox flex justify-content-center gap-1" key={idx}>
                  <input type="checkbox" id={d}></input>
                  <label for={d}>{d}</label>
                </div>
              ))} 
            </div>
          </div>

          <div
            className="col-8 "
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              className="shadow-5 border-round-md bg-white"
              style={{ padding: "20px", minHeight: "350px" }}
            >

              <p>
                reverse mapping checking getaddrinfo for
                207-204-204-084.yourlink.ca [207.204.204.84] failed - POSSIBLE
                BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo for
                ip-187-118-160-162.user.vivozap.com.br [187.118.160.162] failed
                - POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking
                getaddrinfo for 195-154-37-122.rev.poneytelecom.eu
                [195.154.37.122] failed - POSSIBLE BREAK-IN ATTEMPT! reverse
                mapping checking getaddrinfo for
                195-154-45-62.rev.poneytelecom.eu [195.154.45.62] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for adsl-94-50-53-155.tarko-sale.ru [94.50.53.155] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for 195-154-45-62.rev.poneytelecom.eu [195.154.45.62] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for b3d29652.virtua.com.br [179.210.150.82] failed - POSSIBLE
                BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo for
                195-154-59-62.rev.poneytelecom.eu [195.154.59.62] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for hn.kd.ny.adsl [42.239.30.183] failed - POSSIBLE BREAK-IN
                ATTEMPT! reverse mapping checking getaddrinfo for
                186-199-15-51.rev.cloud.scaleway.c
              </p>
            </div>
            <div
              className="shadow-5 bg-white border-round-md"
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "end",
                gap: "200px",
                alignItems: "center",
              }}
            >
              <p style={{ margin: "0px" }}>
                List all IP Addresses trying to hack
              </p>
              <Button label="Submit" />

            </div>
          </div>
        </div>
      </div>

      {/* <PageContainer> 
                <h1>Session</h1>
                <p>Session ID: {sessionId}</p>
                <p>Status: {data.status}</p>
                <p>Details: {data.details}</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </PageContainer> */}
    </MainLayout>
  );
}
