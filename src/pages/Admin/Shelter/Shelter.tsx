import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel";
import { updateShelter } from "../../../services/shelter/updateShelter";
import styles from "./Shelter.module.css";

const shelterSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres.")
    .max(30, "Nome deve ter no máximo 30 caracteres."),
  email: z.string().email("Campo deve ser um e-mail."),
  phone: z.string().refine(
    (value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 13;
    },
    { message: "Número deve ter 10 caracteres." }
  ),
  whatsApp: z.string().refine(
    (value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 13;
    },
    { message: "Número deve ter entre 10 e 11 caracteres." }
  ),
});

type ShelterSchema = z.infer<typeof shelterSchema>;

export function Shelter() {
  const { handleSubmit, register, formState } = useForm<ShelterSchema>({
    resolver: zodResolver(shelterSchema),
  });

  const registerWhithMask = useHookFormMask(register);

  const queryClient = useQueryClient();

  async function submit({ name, email, phone, whatsApp }: ShelterSchema) {
    const toastID = toast.loading("Salvando dados");
    try {
      await updateShelter({
        name,
        email,
        phone: phone.replace(/\D/g, ""),
        whatsApp: whatsApp.replace(/\D/g, ""),
      });
      queryClient.invalidateQueries({ queryKey: ["get-shelter"] });
      toast.success("Dados salvos com sucesso.", {
        id: toastID,
        closeButton: true,
      });
    } catch (error) {
      toast.error("Não foi possível salvar os dados."),
        {
          id: toastID,
          closeButton: true,
        };
    }
    // console.log(name, email, phone, whatsApp);
  }
  return (
    <Panel>
      <form className={styles.container} onSubmit={handleSubmit(submit)}>
        <div>
          <Input label="Nome" {...register("name")} />
          {formState.errors?.name && (
            <p className={styles.formError}>{formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <Input label="Email" {...register("email")} />
          {formState.errors?.email && (
            <p className={styles.formError}>{formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Telefone"
            {...registerWhithMask("phone", ["(99) 9999-9999"])}
          />
          {formState.errors?.phone && (
            <p className={styles.formError}>{formState.errors.phone.message}</p>
          )}
        </div>
        <div>
          <Input
            label="WhatsApp"
            {...registerWhithMask("whatsApp", ["(99) 99999-9999"])}
          />
          {formState.errors?.whatsApp && (
            <p className={styles.formError}>
              {formState.errors.whatsApp.message}
            </p>
          )}
        </div>

        <Button type="submit">Salvar dados</Button>
      </form>
    </Panel>
  );
}
