import Logo from "@/components/Logo";
import { create } from "@/utils/api/session";
import { useLocalStorage } from "primereact/hooks";
import { useCookie } from "@/utils/hooks/useCookie";
import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { useRouter } from "next/router";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import {
  PageContainer,
  ElementContainer,
  FrameContainer,
} from "@/layout/Containers";
import {
  applications,
  embeddingMethods,
  vectorStores,
} from "@/constants/options";
import { getRadioButtonHookForm } from "@/utils/ui/buttons";
import { Divider } from "@/layout/Elements";
import MainLayout from "@/layout/Layout";
export default function Home() {
  const toast = useRef(null);
  const router = useRouter();
  const [sessionIdLocalStorage, setSessionIdLocalStorage] = useLocalStorage(
    "0",
    "session_id"
  );
  const [sessionIdCookie, setSessionIdCookie] = useCookie(null, "session_id");
  const [sessionId, setSessionId] = useState(null);
  const show = (data) => {
    toast.current.show({
      severity: "info",
      summary: "Data Submitted",
      detail: JSON.stringify(data),
      life: 3000,
    });
  };
  const error = (data) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: JSON.stringify(data),
      life: 3000,
    });
  };
  const defaultValues = {
    session_name: "Test Session 1",
    application_name: "SSH",
    request_file: null,
    embedding_method: "Google",
    vector_database: "Milvus",
  };
  const redirect = (path) => {
    router.push(path);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues });
  const onFileSelect = (e) => {
    const file = e.files[0];
    setValue("request_file", file, { shouldValidate: true });
  };
  const onSubmit = async (data) => {
    const response = await create(data);
    const { session_id } = response;
    if (session_id) {
      setSessionIdLocalStorage(session_id);
      setSessionIdCookie(session_id);
      setSessionId(session_id);
      const path = `/sessions?session_id=${session_id}`;
      redirect(path);
    } else {
      error("response");
    }
  };
  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  return (
    <MainLayout>
      <div
        className="flex justify-content-center "
        style={{ minHeight: "60vh" }}
      >
        <Toast ref={toast} />
        <form
        className="border-round-xl"
          style={{
            display: "flex",
            flexDirection: " column",
            justifyContent: " center",
            minWidth: "70%",
            backgroundColor: "#F4F6FA",
            // borderRadius:"10px"
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-content-center gap-5" style={{}}>
            <div className="flex ">
              <Controller
                name="session_name"
                control={control}
                rules={{ required: "Session name is required" }}
                render={({ field, fieldState }) => (
                  <div>
                    <div className="flex">
                      <ElementContainer>
                        <InputText
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.error,
                          })}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder="Enter session name"
                        />
                      </ElementContainer>
                      {getFormErrorMessage("initials")}
                    </div>
                  </div>
                )}
              />
              <Controller
                name="application_name"
                control={control}
                rules={{ required: "Application is required" }}
                render={({ field, fieldState }) => (
                  <ElementContainer>
                    <Dropdown
                      id={field.name}
                      {...field}
                      value={field.value}
                      options={applications}
                      optionLabel="name"
                      focusInputRef={field.ref}
                      placeholder="Select an application"
                      onChange={(e) => field.onChange(e.value)}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </ElementContainer>
                )}
              />
            </div>
            <Controller
              name="request_file"
              control={control}
              // rules={{ required: 'Request file is required' }}
              render={({ field, fieldState }) => (
                <div>
                  <ElementContainer>
                    {/* <div className="text-2xl font-medium text-900 mb-2">Request File</div> */}
                    <FileUpload
                      id={field.name}
                      name={field.name}
                      mode="basic"
                      accept=".log"
                      maxFileSize={1000000}
                      onSelect={onFileSelect}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </ElementContainer>
                  {getFormErrorMessage("request_file")}
                </div>
              )}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              maxWidth: "72%",
            }}
          ></div>
          <div style={{ display: "grid", justifyItems: " center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                maxWidth: " 80%",
              }}
            >
              <div
                className="shadow-3 bg-white p-3 border-round-xl"
                style={{ minWidth: "265px"}}
              >
                <Controller
                  name="embedding_method"
                  control={control}
                  rules={{ required: "Embedding Method is required" }}
                  render={({ field, fieldState }) => (
                    <div className="flex">
                      <div>
                        <div>
                          <div
                            className="text-2xl font-medium  mb-2"
                            style={{
                              textWrap: " nowrap",
                            }}
                          >
                            Embedding Methods
                          </div>
                        </div>
                        <div className="border-round-xl" style={{backgroundColor: "#C6CAD0"}}>
                          {getRadioButtonHookForm(
                            embeddingMethods,
                            field,
                            fieldState
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <Divider />
              <div
                className="shadow-3 bg-white p-3 border-round-xl"
                style={{ minWidth: "265px"}}
              >
                <Controller
                  name="vector_database"
                  control={control}
                  rules={{ required: "Vector Store is required" }}
                  render={({ field, fieldState }) => (
                    <div>
                      <div className="text-2xl font-medium mb-2">
                        Vector Store
                      </div>
                      <div className="border-round-xl" style={{backgroundColor: "#C6CAD0"}}>
                        {getRadioButtonHookForm(
                          vectorStores,
                          field,
                          fieldState
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-content-center">
              <Button type="submit" label="Submit" className=" mt-4 w-1/4" />
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}