import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { type CaseStudy, caseStudySchema } from "@/lib/schema";
import { usePostApiCaseStudiesMutation, usePutApiCaseStudiesByIdMutation } from "@/store/services/apis";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import ImageUploader from "../ui/image-uploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface CaseStudyFormProps {
  caseStudy?: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls?: string;
    images?: string;
    ceo_statement: string;
    conclusion: string;
  };
}

const CaseStudyForm = ({ caseStudy }: CaseStudyFormProps) => {
  const { id } = useParams();

  const form = useForm<CaseStudy>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: caseStudy?.title ?? "",
      description: caseStudy?.description ?? "",
      challenge: caseStudy?.challenge ?? "",
      results: caseStudy?.results ?? "",
      onboarding_improved: caseStudy?.onboarding_improved ?? "",
      retention_increase: caseStudy?.retention_increase ?? "",
      time_spent_increase: caseStudy?.time_spent_increase ?? "",
      research: caseStudy?.research ?? "",
      architecture: caseStudy?.architecture ?? "",
      wireframing: caseStudy?.wireframing ?? "",
      testing: caseStudy?.testing ?? "",
      design: caseStudy?.design ?? "",
      tech_stack_urls: caseStudy?.tech_stack_urls ? JSON.parse(caseStudy.tech_stack_urls) : [],
      images: caseStudy?.images ? JSON.parse(caseStudy.images) : [],
      ceo_statement: caseStudy?.ceo_statement ?? "",
      conclusion: caseStudy?.conclusion ?? "",
    },
  });
  const [addCaseStudy, { isLoading: adding }] = usePostApiCaseStudiesMutation();
  const [editCaseStudy, { isLoading: editing }] = usePutApiCaseStudiesByIdMutation();

  const {
    fields: techStackFields,
    append: appendTechStack,
    remove: removeTechStack,
  } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "tech_stack_urls",
    rules: {
      required: false,
    },
  });

  const onSubmit = async (values: CaseStudy) => {
    let response = null;

    if (caseStudy) {
      response = await editCaseStudy({
        id: `${caseStudy.id}`,
        body: {
          ...values,
          project_id: Number(id),
          tech_stack_urls: JSON.stringify(values.tech_stack_urls || []),
          images: JSON.stringify(values.images || []),
        },
      });
    } else {
      response = await addCaseStudy({
        body: {
          ...values,
          project_id: Number(id),
          tech_stack_urls: JSON.stringify(values.tech_stack_urls || []),
          images: JSON.stringify(values.images || []),
        },
      });
    }

    if (response.error) {
      toast.error(`Failed to ${caseStudy ? "Edit" : "Add"} Case Study!`);
    } else {
      toast.success(`${caseStudy ? "Edited" : "Added"} Case Study Successfully!`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative h-full w-full">
        <div className="flex h-[calc(100vh-190px)] w-full flex-col items-start justify-start gap-4 overflow-y-auto">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Modernizing a Subscription Management Platform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Complete overhaul of a subscription management platform to improve usability, streamline workflows, and enhance overall user experience."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="challenge"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Challenge</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The original platform had an outdated interface that was difficult to navigate, causing frustration among users."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="results"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Results</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Post-redesign, user engagement significantly increased with a 25% reduction in task completion time and a 30% decrease in user error rates."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="onboarding_improved"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Onboarding Improvement %</FormLabel>
                <FormControl>
                  <Input placeholder="35%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="retention_increase"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Retention Increase %</FormLabel>
                <FormControl>
                  <Input placeholder="25%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time_spent_increase"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Time Spent Increase %</FormLabel>
                <FormControl>
                  <Input placeholder="84%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="research"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Research & Analysis</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="We conducted user interviews, surveys, and analyzed in-app analytics to understand the pain points and user needs."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="architecture"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Information Architecture</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Based on the research findings, we restructured the app's navigation and content, prioritizing features and information according to user needs."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wireframing"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Wireframing & Prototyping</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="We designed low-fidelity wireframes to visualize the new layout and navigation, iteratively refining them based on user feedback."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="testing"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Usability Testing</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="We conducted usability tests with a diverse group of users to validate the design and identify areas for improvement."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="design"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Visual Design & Style Guide</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="We developed a cohesive visual language, including color schemes, typography, and iconography, ensuring consistency throughout the app."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-center">
            <Label className="flex-1 text-left">Tech Stack URLs (Optional)</Label>
            <Button type="button" onClick={() => appendTechStack("")} variant="outline" size="icon">
              <Plus />
            </Button>
          </div>
          {techStackFields.map((field, idx) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`tech_stack_urls.${idx}`}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-center justify-center gap-2 space-y-0">
                  <div className="flex w-full items-center justify-center gap-2">
                    <FormControl>
                      <Input placeholder="Tech stack icon URL" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="shrink-0"
                      onClick={() => removeTechStack(idx)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          ))}
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Label className="w-full text-left text-sm">Case Study Images (Minimum 6 required)</Label>
            <ImageUploader
              images={form.getValues("images")}
              setImages={(images) => form.setValue("images", images)}
              multiple={true}
              minImages={6}
              maxImages={20}
            />
          </div>
          <FormField
            control={form.control}
            name="ceo_statement"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>CEO Statement</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="With our new visual branding and language in place, the new platform clearly captures the essence of our current and target customer base."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="conclusion"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Conclusion</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The modernization of the platform successfully addressed the core usability issues and improved the overall user experience."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default CaseStudyForm;
