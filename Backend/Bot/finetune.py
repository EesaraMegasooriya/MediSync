import json
from datasets import Dataset
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration, Trainer, TrainingArguments

# ✅ Load dataset
with open("training_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)
dataset = Dataset.from_list([{"input": d["input"], "output": d["output"]} for d in data])

# ✅ Load model and tokenizer
MODEL_NAME = "facebook/blenderbot-400M-distill"
tokenizer = BlenderbotTokenizer.from_pretrained(MODEL_NAME)
model = BlenderbotForConditionalGeneration.from_pretrained(MODEL_NAME)

# ✅ Preprocessing
def preprocess(example):
    inputs = tokenizer(example["input"], max_length=128, truncation=True, padding="max_length", return_tensors="pt")
    targets = tokenizer(example["output"], max_length=128, truncation=True, padding="max_length", return_tensors="pt")
    return {
        "input_ids": inputs["input_ids"].squeeze(),
        "attention_mask": inputs["attention_mask"].squeeze(),
        "labels": targets["input_ids"].squeeze()
    }

dataset = dataset.map(preprocess)

# ✅ Training arguments
training_args = TrainingArguments(
    output_dir="./blenderbot-medical",
    run_name="medical-chatbot-run",
    per_device_train_batch_size=2,
    num_train_epochs=3,
    save_strategy="epoch",
    eval_strategy="epoch",
    logging_dir="./logs",
    logging_steps=10,
    save_total_limit=1,
    report_to="none"  # disables wandb
)

# ✅ Train
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    eval_dataset=dataset
)

trainer.train()

# ✅ Save the model
model.save_pretrained("./blenderbot-medical")
tokenizer.save_pretrained("./blenderbot-medical")
