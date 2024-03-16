import Logo from '@/components/Logo';

import React, { useState, useEffect, useRef } from "react";
import { useCookie } from '@/utils/hooks/useCookie';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ElementContainer, PageContainer } from '@/layout/Containers';
import { Button } from 'primereact/button';
import { deleteOne, getAll } from '@/utils/api/session';
import { useRouter } from 'next/router';

export default function Home() {
  const toast = useRef(null);
  const router = useRouter();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState();

  const [sessionIdCookie, setSessionIdCookie] = useCookie(null, 'session_id');
  const [sessionIdLocalStorage, setSessionIdLocalStorage] = useCookie(null, 'session_id');
  const [updateNeeded, setUpdateNeeded] = useState(false);
  const [error, setError] = useState("");
  const statusColumn = (data) => {
    return (
      data.status ? <i className="pi pi-check"></i> : <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i>
    );
  }

  const actionsColumn = (data) => {
    return (
      <ElementContainer>
        <Button
          label="View"
          icon="pi pi-search "
          onClick={() => launchSession(data)}
          className='mr-2'
        />
        <Button
          label=""
          icon="pi pi-trash"
          onClick={() => deleteSession(data.session_id)}
          className='p-button-danger'
        />
      </ElementContainer>
    );
  }
  const launchSession = (data) => {
    setSessionIdCookie(data.session_id);
    setSessionIdLocalStorage(data.session_id);
    redirect(`/sessions/${data.session_id}`);
  }
  const redirect = (path) => {
    router.push(path);
  }
  const deleteSession = async (sessionId) => {
    const answer = getConfirmation();
    if (!answer) {
      const response = await deleteOne(sessionId)
      updateTable();
    }
  }
  const getConfirmation = () => {
    const confirmation = confirm("Are you sure you want to delete this session?");
    return confirmation;
  }

  const updateTable = async () => {
    const data = await getAll(query);

    if (data.error) {
      setError(data.error);
      setData([]);
      return;
    }
    setError("");
    setData(data.data);
  }

  useEffect(() => {

    updateTable();

  }, []);

  //update the table every 5 seconds
  useEffect(() => {
    if (updateNeeded) {
      const interval = setInterval(() => {
        updateTable();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div>
      <Toast ref={toast} />

      <PageContainer>
        <Logo />
        <div>
          <DataTable value={data} tableStyle={{ minWidth: "50rem" }} dataKey='session_id'>
            <Column field="application_name" header="Application Name"></Column>
            <Column field="session_name" header="Session Name"></Column>
            <Column field="vector_store" header="Vector Store"></Column>
            <Column field="embedding_method" header="Embedding Method"></Column>
            <Column field="status" header="Status" body={statusColumn}></Column>
            <Column field="actions" header="Actions" body={actionsColumn}></Column>
          </DataTable>
        </div>

      </PageContainer>

    </div>

  );
}

