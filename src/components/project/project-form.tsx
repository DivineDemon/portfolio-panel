import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { type Project, projectSchema } from "@/lib/schema";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ProjectFormProps {
  project?: Project;
}

const ProjectForm = ({ project }: ProjectFormProps) => {
  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: project,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "projectFeatures",
    rules: {
      minLength: 1,
      required: true,
    },
  });

  function onSubmit(values: Project) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative h-full w-full"
      >
        <div className="flex h-[calc(100vh-190px)] w-full flex-col items-start justify-start gap-2.5 overflow-y-auto">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Post Apocalyptic Armor Store"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
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
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="2077" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectLink"
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
          <div className="flex w-full items-center justify-center">
            <Label className="flex-1 text-left">Project Features</Label>
            <Button
              type="button"
              onClick={() => append("")}
              variant="outline"
              size="icon"
            >
              <Plus />
            </Button>
          </div>
          {fields.map((field, idx) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`projectFeatures.${idx}`}
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
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors?.projectFeatures?.message
                ? form.formState.errors.projectFeatures.message
                : form.formState.errors?.projectFeatures?.root?.message}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-[1] flex w-full items-center justify-end bg-background pt-2.5">
          <Button type="submit" variant="default">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
