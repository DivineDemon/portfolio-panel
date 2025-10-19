import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { type Project, projectSchema } from "@/lib/schema";
import { usePostApiProjectsMutation, usePutApiProjectsByIdMutation } from "@/store/services/apis";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import ImageUploader from "../ui/image-uploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ProjectFormProps {
  project?: {
    id: number;
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
    company_name: string | null;
  };
}

const ProjectForm = ({ project }: ProjectFormProps) => {
  const { id } = useParams();

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      company: project?.company_name ?? "",
      features: project?.features.split(","),
      link: project?.link ?? "",
      project_name: project?.project_name ?? "",
      start_year: project?.start_year ?? 0,
      image: project?.image ?? "",
    },
  });
  const [addProject, { isLoading: adding }] = usePostApiProjectsMutation();
  const [editProject, { isLoading: editing }] = usePutApiProjectsByIdMutation();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "features",
    rules: {
      minLength: 1,
      required: true,
    },
  });

  const onSubmit = async (values: Project) => {
    let response = null;

    if (project) {
      response = await editProject({
        id: `${project.id}`,
        body: {
          company_id: Number(id),
          features: values.features,
          link: values.link,
          project_name: values.project_name,
          start_year: values.start_year,
          image: values.image ?? "",
        },
      });
    } else {
      response = await addProject({
        body: {
          company_id: Number(id),
          features: values.features,
          link: values.link,
          project_name: values.project_name,
          start_year: values.start_year,
          image: values.image ?? "",
        },
      });
    }

    if (response.error) {
      toast.error(`Failed to ${project ? "Edit" : "Add"} Project!`);
    } else {
      toast.success(`${project ? "Edited" : "Added"} Project Successfully!`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative h-full w-full">
        <div className="flex h-[calc(100vh-190px)] w-full flex-col items-start justify-start gap-4 overflow-y-auto">
          <FormField
            control={form.control}
            name="project_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Post Apocalyptic Armor Store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Monsters Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2077"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://warfashion2077.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Label className="w-full text-left text-sm">Project Image</Label>
            <ImageUploader
              image={form.getValues("image")}
              setValue={form.setValue as (name: string, value: string) => void}
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <Label className="flex-1 text-left">Project Features</Label>
            <Button type="button" onClick={() => append("")} variant="outline" size="icon">
              <Plus />
            </Button>
          </div>
          {fields.map((field, idx) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`features.${idx}`}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-center justify-center gap-2 space-y-0">
                  <div className="flex w-full items-center justify-center gap-2">
                    <FormControl>
                      <Input placeholder="Feature" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="shrink-0"
                      onClick={() => remove(idx)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          ))}
          <div className="w-full">
            <p className="font-medium text-[0.8rem] text-destructive">
              {form.formState.errors?.features?.message
                ? form.formState.errors.features.message
                : form.formState.errors?.features?.root?.message}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-[1] flex w-full items-center justify-end bg-background pt-2.5">
          <Button type="submit" variant="default" disabled={editing || adding}>
            {editing || adding ? (
              <>
                <Loader2 className="animate-spin" />
                Please Wait...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
